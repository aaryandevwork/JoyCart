import { matchedData } from "express-validator"
import { uploadFiles } from "../../shared/services/imagekit.service.js";
import productModel from "./product.model.js";

export const createProductController = async (req, res) => {
    const {title, description, price, sizes } = matchedData(req);
    const {userId} = req.user;

    const filesUrls = await Promise.all(
        (req.files || []).map( async (file) => {
            const response = await uploadFiles({buffer : file.buffer, fileName : file.originalname});
            return response.url;
        })
    )    
    
    const product = await productModel.create({
        title,
        description,
        price,
        sizes,
        images : filesUrls,
        seller : userId
    })

    res.status(200).json({
        message : "Product added successfully",
        data : {
            product
        }
    })

}