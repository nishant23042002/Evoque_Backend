import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/DataBase.js";
import productRoutes from "./routes/product.route.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 5001;



app.get("/", (req, res) => {
    res.send("Evoque API is running 🚀");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
