import { check } from "express-validator";
import { checkValidation } from "../../middlewares/validatorMidleware.js";

const createGameValidator = [
  check("name").trim().notEmpty().withMessage("اسم اللعبة مطلوب"),

  check("image")
    .notEmpty()
    .withMessage("رابط الصورة مطلوب")
    .isURL()
    .withMessage("يجب أن يكون رابط الصورة صالحًا"),

  check("averageNudity")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة العري بين 0 و10"),

  check("averageBeliefs")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المعتقدات بين 0 و10"),

  check("averageHomosexuality")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("يجب أن تكون درجة المثلية بين 0 و10"),

  checkValidation,
];

export default { createGameValidator };
