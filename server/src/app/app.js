import express from "express";
import authRoutes from "../features/auth/auth.routes.js"
import productRoutes from "../features/products/product.routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "../shared/config/config.js";

const app = express();

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        message : "JoyCart Running Fine"
    })
});


app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

export default app;