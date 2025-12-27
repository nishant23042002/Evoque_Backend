import express from "express"
import connectDB from "./config/DataBase.js"
import dotenv from "dotenv"
import productRoutes from "./routes/product.route.js"
import categoryRoutes from "./routes/category.route.js"
import cors from "cors";

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
app.use("/api/categories", categoryRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});