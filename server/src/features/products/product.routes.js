import { Router } from "express";
import {
  authenticate,
  authenticateSeller,
} from "../../shared/middlewares/auth.middleware.js";
import upload from "../../shared/config/multer.config.js";
import { createProductController, deleteProduct, getSingleProduct, listAllProduct, updateProduct } from "./product.controller.js";
import { productIdValidator, productValidator, updateProductValidator } from "./product.validator.js";

const router = Router();

/**
 * @Functinality ADD product
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
 * @Functinality Get all products
 * @method GET 
 * @route /api/products/
 * @access ALL
 */

router.get("/",listAllProduct)

/**
 * @Functinality Get single product
 * @method GET
 * @route /api/products/:id
 * @access ALL
 * @description : get single product by id
 */

router.get("/:id", productIdValidator,getSingleProduct)

/**
 * @Functinality Get update product
 * @method PUT
 * @route /api/products/:id
 * @access seller
 * @description : update product by Id
 */

router.put("/:id", authenticate, authenticateSeller, upload.array("images",5), (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  }, updateProductValidator, updateProduct)

/**
 * @Functinality Get delete product
 * @method DELETE
 * @route /api/products/:id
 * @access seller
 * @description : delete product by Id
 */

router.delete("/:id",authenticate,authenticateSeller,productIdValidator,deleteProduct)

export default router;
