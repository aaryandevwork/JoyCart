import app from "./app/app.js";
import connectDB from "./shared/config/db.js";
import dotenv from "dotenv";

dotenv.config()

await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`server is running at port ${PORT}`);
})