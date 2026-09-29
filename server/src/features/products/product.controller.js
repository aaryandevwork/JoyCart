import { matchedData } from "express-validator";
import { uploadFiles } from "../../shared/services/imagekit.service.js";
import productModel from "./product.model.js";

export const createProductController = async (req, res) => {
  const { title, description, price, sizes } = matchedData(req);
  const { userId } = req.user;

  const filesUrls = await Promise.all(
    (req.files || []).map(async (file) => {
      const response = await uploadFiles({
        buffer: file.buffer,
        fileName: file.originalname,
      });
      return response.url;
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price,
    sizes,
    images: filesUrls,
    seller: userId,
  });

  res.status(201).json({
    message: "Product added successfully",
    data: {
      product,
    },
  });
};

export const listAllProduct = async (req, res) => {
  const products = await productModel.find();

  res.status(200).json({
    message: "All products fetched successfully",
    data: {
      products,
    },
  });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  res.status(200).json({
    message: "Product data fetched successfully",
    data: {
      product,
    },
  });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, sizes } = matchedData(req);
  const { userId } = req.user;

  console.log(req.body);

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  const updates = {};

  if (title !== undefined) {
    updates.title = title;
  }

  if (description !== undefined) {
    updates.description = description;
  }

  if (price?.amount !== undefined) {
    updates["price.amount"] = price.amount;
  }

  if (price?.currency !== undefined) {
    updates["price.currency"] = price.currency;
  }

  if (price?.currency !== undefined) {
    updates["price.currency"] = price.currency;
  }
  if (sizes !== undefined) {
    updates.sizes = sizes;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    { $set: updates },
    {
      new: true,
      runValidators: true,
    },
  );

  return res.status(200).json({
    message: "Product updated successfully",
    data: {
      product: updatedProduct,
    },
  });
};

export const deleteProduct = async (req, res) => {
    const { id } =  req.params;

    const product = await productModel.findById(id);

    if(!product){
        return res.status(400).json({
            message : "Product not found"
        })
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({
        message : "product deleted successfully"
    })

}