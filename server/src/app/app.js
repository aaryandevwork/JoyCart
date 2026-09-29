import express from "express";
import authRoutes from "../features/auth/auth.routes.js"
import productRoutes from "../features/products/product.routes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        message : "fine broh"
    })
});


app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

export default app;