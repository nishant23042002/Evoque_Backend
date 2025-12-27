import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

export const addProduct = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.body.category });

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const newProduct = await Product.create({
            ...req.body,
            category: category._id,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getProducts = async (req, res) => {
    try {
        const { category, tag, page = 1, limit = 20 } = req.query;

        const filter = { isActive: true };

        if (category) {
            const cat = await Category.findOne({ slug: category });
            if (!cat) {
                return res.status(404).json({ message: "Category not found" });
            }
            filter.category = cat._id;
        }

        if (tag) filter.tags = tag;

        const products = await Product.find(filter)
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
