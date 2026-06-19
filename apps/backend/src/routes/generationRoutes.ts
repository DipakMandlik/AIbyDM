import { Router } from "express";
import { generatePostsHandler, generateImageHandler } from "../controllers/generationController";

const router = Router();

router.post("/posts", generatePostsHandler);
router.post("/image", generateImageHandler);

export default router;

