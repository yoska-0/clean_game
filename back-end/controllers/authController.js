import bcrypt from "bcrypt";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import PendingUser from "../models/pendingUser.js";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";
import sendEmail from "../utils/sendEmail.js";

// create code
const createCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");
  return { code, hashedCode };
};

// verify confirm code
const verifyConfirmCode = asyncHandler(async (req, res, next) => {
  // get user
  const TempUser = await PendingUser.findOne({
    codeConfirm: crypto
      .createHash("sha256")
      .update(req.body.codeConfirm)
      .digest("hex"),
    codeConfirmExpires: { $gt: Date.now() },
    email: req.body.email,
  });

  if (!TempUser) {
    return next(new AppError("الكود غير صحيح أو أنتهت صلاحيته", 400));
  }

  // create new user
  const newUser = await User.create({
    name: TempUser.name,
    email: TempUser.email,
    password: TempUser.password,
  });

  // delete pending user
  await TempUser.deleteOne();

  // create new token
  const token = createToken(newUser._id);

  res.status(201).json({ status: "success", token });
});

const signUp = asyncHandler(async (req, res, next) => {
  // create new user
  const { name, email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("البريد الإلكتروني مستخدم بالفعل", 400));
  }

  // create reset code
  const { code: confirmCode, hashedCode: hashedConfirmCode } = createCode();

  await PendingUser.deleteMany({ email });

  const pandingUser = await PendingUser.create({
    name,
    email,
    password,
    codeConfirm: hashedConfirmCode,
    codeConfirmExpires: Date.now() + 10 * 60 * 1000,
  });

  // confirm email

  //send code to email
  try {
    await sendEmail({
      email,
      subject: "Confirm your email",
      message: `Your confirm code is: ${confirmCode}`,
    });
  } catch (error) {
    await pandingUser.deleteOne();
    console.log(error);
    return next(new AppError("فشل أرسال الكود ", 500));
  }

  res.status(200).json({
    status: "success",
    email,
    message: "تم إرسال كود التحقق إلى البريد الإلكتروني",
  });
});

const logIn = asyncHandler(async (req, res, next) => {
  // get user
  const user = await User.findOne({ email: req.body.email });

  // check if email or password is correct
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(
      new AppError("البريد الإلكتروني أو كلمة المرور غير صحيحة", 401),
    );
  }

  // create new token
  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

const protect = asyncHandler(async (req, res, next) => {
  // get token and check if it's valid
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new AppError("لم تقم بتسجل الدخول", 401));
  }

  // verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError("التوكين غير صحيح من فضلك قم بتسجيل الدخول", 401));
  }

  // check if user still exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new AppError("ذالك المستخدم لم يعد موجودا", 401));
  }

  // check if user changed password after the token was issued
  if (currentUser.changePasswordAt) {
    const changedTimestamp = parseInt(
      currentUser.changePasswordAt.getTime() / 1000,
      10,
    );
    if (decoded.iat < changedTimestamp) {
      return next(new AppError("المستخدم كام بتغير كلمة المرور مؤخرا", 401));
    }
  }

  req.user = currentUser;
  next();
});

// password functions
const forgatPassword = asyncHandler(async (req, res, next) => {
  // get user
  const user = await User.findOne({ email: req.body.email });

  // check if user exists
  if (!user) {
    return next(new AppError("المستخدم لم يعد موجودا", 404));
  }

  // create reset code
  const { code: resetCode, hashedCode: hashedResetCode } = createCode();

  // set reset code and expiration date
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save({ validateBeforeSave: false });

  // send email
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset code",
      message: `Your password reset code is: ${resetCode}`,
    });
  } catch (error) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("هناك مشكلة في البريد الالكتروني", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Password reset code sent to email",
  });
});

const verifyResetCode = asyncHandler(async (req, res, next) => {
  // get user and check if reset code is valid
  const user = await User.findOne({
    passwordResetCode: crypto
      .createHash("sha256")
      .update(req.body.resetCode)
      .digest("hex"),
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("الكود غير صحيح أو أنتهت صلاحيته", 400));
  }

  // set password reset verified to true
  user.passwordResetVerified = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Reset code verified",
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  // get user
  const user = await User.findOne({ email: req.body.email });

  // check if user exists
  if (!user) {
    return next(new AppError("المستخدم لم يعد موجودا", 404));
  }

  // check if reset code is valid
  if (!user.passwordResetVerified) {
    return next(new AppError("لم يتم التحقق من رمز", 400));
  }

  // update password
  user.password = req.body.newPassword;
  user.changePasswordAt = Date.now();
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

export default {
  signUp,
  verifyConfirmCode,
  logIn,
  protect,
  forgatPassword,
  verifyResetCode,
  resetPassword,
};
