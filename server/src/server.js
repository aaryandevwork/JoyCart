import app from "./app/app.js";
import connectDB from "./shared/config/db.js";

await connectDB();

app.listen(3000, () => {
    console.log("server is running at port 3000");
})