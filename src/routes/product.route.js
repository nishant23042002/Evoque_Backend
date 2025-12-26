import express from "express";
import { getAllProducts, getProductBySlug } from "../controllers/product.controller.js";
import Product from "../models/Product.model.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);

router.post("/", async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});


export default router;
