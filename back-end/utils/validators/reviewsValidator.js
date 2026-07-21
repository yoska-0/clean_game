import { check } from "express-validator";
import { checkValidation } from "../../middlewares/validatorMidleware.js";
import Review from "../../models/reviewsModel.js";

const createReviewValidator = [
  check("nudity")
    .notEmpty()
    .withMessage("تقييم العري مطلوب")
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المحتوي الجنسي بين 0 و10"),

  check("beliefs")
    .notEmpty()
    .withMessage("تقييم المعتقدات مطلوب")
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المعتقدات بين 0 و10"),

  check("homosexuality")
    .notEmpty()
    .withMessage("تقييم المثلية مطلوب")
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المثلية بين 0 و10"),

  check("comment")
    .notEmpty()
    .withMessage("التعليق مطلوب")
    .isLength({
      max: 300,
    })
    .withMessage("يجب ألا يزيد التعليق عن 300 حرف"),

  check("game")
    .notEmpty()
    .withMessage("معرف اللعبة مطلوب")
    .isMongoId()
    .withMessage("معرف اللعبة غير صالح")
    .custom(async (game, { req }) => {
      const review = await Review.findOne({ game, user: req.user._id });
      if (review) {
        throw new Error("لقد قمت بتقييم هذه اللعبة من قبل");
      }
      return true;
    }),

  check("user")
    .notEmpty()
    .withMessage("معرف المستخدم مطلوب")
    .isMongoId()
    .withMessage("معرف المستخدم غير صالح")
    .custom(async (user, { req }) => {
      // check if user exists is the same user create review
      if (user !== req.user._id.toString()) {
        throw new Error("غير مسموح لك بإضافة تقييم لهذه اللعبة");
      }
      return true;
    }),

  checkValidation,
];

const updateReviewValidator = [
  check("nudity")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المحتوي الجنسي بين 0 و10"),

  check("beliefs")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المعتقدات بين 0 و10"),

  check("homosexuality")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("يجب أن تكون درجة المثلية بين 0 و10"),

  check("comment")
    .optional()
    .isLength({
      max: 700,
    })
    .withMessage("يجب ألا يزيد التعليق عن 700 حرف"),

  check("game").isMongoId().withMessage("معرف اللعبة غير صالح"),

  check("user")
    .isMongoId()
    .withMessage("معرف المستخدم غير صالح")
    .custom(async (userId, { req }) => {
      // check if user exists is the same user create review
      const review = await Review.findById(req.params.id);
      if (review.user.toString() !== req.user._id.toString()) {
        throw new Error("غير مسموح لك بتعديل هذا التقييم");
      }
      return true;
    }),

  checkValidation,
];

export default { createReviewValidator, updateReviewValidator };
