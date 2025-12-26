import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        brand: String,
        slug: { type: String, required: true, unique: true },
        price: Number,
        images: [String],
        category: String,
        description: String
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product