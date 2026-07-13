import { check } from "express-validator";
import slugify from "slugify";
import AppError from "../appError.js";
import { checkValidation } from "../../middlewares/validatorMidleware.js";
import User from "../../models/userModel.js";

const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("الاسم مطلوب")
    .isLength({ min: 3 })
    .withMessage("يجب ألا يقل الاسم عن 3 أحرف")
    .isLength({ max: 32 })
    .withMessage("يجب ألا يزيد الاسم عن 32 حرفًا")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("البريد الإلكتروني مطلوب")
    .isEmail()
    .withMessage("البريد الإلكتروني غير صالح")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("البريد الإلكتروني مستخدم بالفعل");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("كلمة المرور مطلوبة")
    .isLength({ min: 6 })
    .withMessage("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل")
    .custom((pass, { req }) => {
      if (pass !== req.body.passwordConfirm) {
        throw new Error("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      }
      return true;
    }),

  check("passwordConfirm").notEmpty().withMessage("تأكيد كلمة المرور مطلوب"),

  checkValidation,
];

export default { createUserValidator };
