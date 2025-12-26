import Product from "../models/Product.model.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};
