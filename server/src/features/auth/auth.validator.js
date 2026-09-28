import { body , validationResult} from 'express-validator'

export const registerValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be String").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be String").bail()
        .trim()
        .isLength({min : 3, max : 50}).withMessage("Name must be between 3 to 50 character"),
    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be String").bail()
        .trim()
        .isLength({min : 6}).withMessage("Password must be minimum 6 characters"),
    body("confirmPassword")
        .exists().withMessage("confirmPassword is required").bail()
        .isString().withMessage("confirmPassword must be String").bail()
        .trim()
        .isLength({min : 6}).withMessage("confirmPassword must be minimum 6 characters").bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }

            return true;
        }),


    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Invalid Request",
                errors : errors.array().map((err) => ({
                    field : err.path,
                    message : err.msg
                })),
            })
        }

        next();
    }
]

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be string").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address").bail(),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be string").bail()
        .trim()
        .isLength({min : 6}).withMessage("Password must be minimum 6 characters"),
    
        (req, res, next) => {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    message : "Invalid Request",
                    errors : errors.array().map((err) => ({
                        field : err.path,
                        message : err.msg
                    })),
                })
            }
            next()
        }
]