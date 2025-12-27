import express from "express"
import { createCategory, getCategoryBySlug } from "../controllers/category.controller.js"


const router = express.Router();

router.post("/", createCategory);
router.get("/:slug", getCategoryBySlug);

export default router;