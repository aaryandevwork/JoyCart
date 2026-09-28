import express from "express";
import authRoutes from "../features/auth/auth.routes.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message : "fine broh"
    })
});


app.use("/api/auth",authRoutes);

export default app;