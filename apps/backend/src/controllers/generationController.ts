import { Request, Response } from "express";
import { generatePosts, PostCategory, generateImage } from "../services/ai";

export async function generatePostsHandler(req: Request, res: Response) {
	try {
		const { count = 10, categories } = req.body || {};
		const cats: PostCategory[] = Array.isArray(categories) && categories.length
			? categories
			: ["AI News", "New AI Tools", "Learning Tips", "Productivity Hacks", "AIbyDM Brand Highlights"];
		const data = await generatePosts(Math.min(Math.max(Number(count) || 10, 1), 25), cats);
		return res.json({ ok: true, items: data });
	} catch (err: any) {
		return res.status(500).json({ ok: false, error: err?.message || "Failed to generate posts" });
	}
}

export async function generateImageHandler(req: Request, res: Response) {
	try {
		const { prompt = "AIbyDM news card" } = req.body || {};
		const result = await generateImage(String(prompt));
		return res.json({ ok: true, ...result });
	} catch (err: any) {
		return res.status(500).json({ ok: false, error: err?.message || "Failed to generate image" });
	}
}

