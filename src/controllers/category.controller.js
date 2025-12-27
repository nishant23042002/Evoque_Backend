import Category from "../models/Category.model.js";
import slugify from "slugify"


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const slug = slugify(name, { lower: true });

        const exists = await Category.findOne({ slug });
        if (exists) {
            return res.status(409).json({ message: "Category already exists" });
        }

        const category = await Category.create({
            name,
            slug,
            description,
        });

        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({
            slug: req.params.slug,
            isActive: true,
        }).populate({
            path: "products",
            match: { isActive: true },
        });;

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
