import {body, validationResult, param } from "express-validator"

export const productValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be String").bail()
        .trim()
        .isLength({min : 3, max: 100}).withMessage("Title must be between 3 to 100 charcaters")
        .isAlpha("en-US", {ignore  : " -"}).withMessage(" Title can only have english lower and upper case character"),
    body("description")
        .exists().withMessage("description is required").bail()
        .isString().withMessage("description must be String").bail()
        .trim()
        .isLength({min : 20, max: 500}).withMessage("description must be between 2 to 500 charcaters"),
    body("price.amount")
        .exists().withMessage("Amount is required").bail()
        .isFloat({min : 0}).withMessage("Price must be floating number and greater than 0"),
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be String").bail()
        .isIn(["INR","USD"]).withMessage("Currency either INR or USD"),
    body("sizes")
        .exists().withMessage("Sizes is required").bail()
        .isArray().withMessage("Sizes must be and array of object"),
    body("sizes.*.size")
        .exists().withMessage("Size must be present in every entry of sizes array").bail()
        .isString().withMessage("Size must be a string").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size can be one of this : XS, S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .exists().withMessage("stock must be present in every entry of sizes array").bail()
        .isInt({min : 0}).withMessage("Stock must be a integer value")
        .toInt(),

    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(401).json({
                message : "Invalid request",
                errors : errors.array().map((err) => ({
                    field : err.path,
                    message : err.msg
                }))
            })
        }
        next()
    }
]

export const updateProductValidator = [
    body("title")
        .optional()
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be String").bail()
        .trim()
        .isLength({min : 3, max: 100}).withMessage("Title must be between 3 to 100 charcaters")
        .isAlpha("en-US", {ignore  : " -"}).withMessage(" Title can only have english lower and upper case character"),
    body("description")
        .optional()
        .exists().withMessage("description is required").bail()
        .isString().withMessage("description must be String").bail()
        .trim()
        .isLength({min : 20, max: 500}).withMessage("description must be between 2 to 500 charcaters"),
    body("price.amount")
        .optional()
        .exists().withMessage("Amount is required").bail()
        .isFloat({min : 0}).withMessage("Price must be floating number and greater than 0"),
    body("price.currency")
        .optional()
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be String").bail()
        .isIn(["INR","USD"]).withMessage("Currency either INR or USD"),
    body("sizes")
        .optional()
        .exists().withMessage("Sizes is required").bail()
        .isArray().withMessage("Sizes must be and array of object"),
    body("sizes.*.size")
        .optional()
        .exists().withMessage("Size must be present in every entry of sizes array").bail()
        .isString().withMessage("Size must be a string").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size can be one of this : XS, S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .optional()
        .exists().withMessage("stock must be present in every entry of sizes array").bail()
        .isInt({min : 0}).withMessage("Stock must be a integer value")
        .toInt(),
    param("id")
        .exists().withMessage("Product id is required in req param").bail()
        .isMongoId().withMessage("Product id must be mongodb object id"),

    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(401).json({
                message : "Invalid request",
                errors : errors.array().map((err) => ({
                    field : err.path,
                    message : err.msg
                }))
            })
        }
        next()
    }
]

export const productIdValidator = [
    param("id")
        .exists().withMessage("Product id is required in req param").bail()
        .isMongoId().withMessage("Product id must be mongodb object id"),
    
    (req,res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Invalid data",
                errors : errors.array()
            })
        }

        next()
    }
]
