import { check } from "express-validator";
import { checkValidation } from "../../middlewares/validatorMidleware.js";

export const createPendingUserValidator = [
  check("name").notEmpty().withMessage("من فضلك أدخل الاسم."),

  check("email")
    .notEmpty()
    .withMessage("من فضلك أدخل البريد الإلكتروني.")
    .isEmail()
    .withMessage("البريد الإلكتروني غير صحيح."),

  check("password")
    .notEmpty()
    .withMessage("من فضلك أدخل كلمة المرور.")
    .isLength({ min: 6 })
    .withMessage("يجب ألا تقل كلمة المرور عن 6 أحرف."),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("من فضلك أكد كلمة المرور.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("كلمتا المرور غير متطابقتين.");
      }
      return true;
    }),

  checkValidation,
];

export default { createPendingUserValidator };
