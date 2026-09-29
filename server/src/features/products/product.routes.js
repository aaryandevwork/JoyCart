import { Router } from "express";
import {
  authenticate,
  authenticateSeller,
} from "../../shared/middlewares/auth.middleware.js";
import upload from "../../shared/config/multer.config.js";
import { createProductController, getSingleProduct, listAllProduct } from "./product.controller.js";
import { productValidator } from "./product.validator.js";

const router = Router();

/**
 * @method POST
 * @route /api/products/
 * @access seller
 * @req.body => {title,decsription,images,price:{amount,currency}, sizes: [{size,stock},{size,stock}]}
 */

router.post(
  "/",
  authenticate,
  authenticateSeller,
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  productValidator
  ,
  createProductController,
);

/**
 * @method GET
 * @route /api/products/
 * @access ALL
 */

router.get("/",listAllProduct)

/**
 * @method GET
 * @route /api/products/:id
 * @access ALL
 * @description : get single product by id
 */

router.get("/:id",getSingleProduct)

export default router;
