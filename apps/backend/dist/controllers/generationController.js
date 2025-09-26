"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePostsHandler = generatePostsHandler;
exports.generateImageHandler = generateImageHandler;
const ai_1 = require("../services/ai");
async function generatePostsHandler(req, res) {
    try {
        const { count = 10, categories } = req.body || {};
        const cats = Array.isArray(categories) && categories.length
            ? categories
            : ["AI News", "New AI Tools", "Learning Tips", "Productivity Hacks", "AIbyDM Brand Highlights"];
        const data = await (0, ai_1.generatePosts)(Math.min(Math.max(Number(count) || 10, 1), 25), cats);
        return res.json({ ok: true, items: data });
    }
    catch (err) {
        return res.status(500).json({ ok: false, error: err?.message || "Failed to generate posts" });
    }
}
async function generateImageHandler(req, res) {
    try {
        const { prompt = "AIbyDM news card" } = req.body || {};
        const result = await (0, ai_1.generateImage)(String(prompt));
        return res.json({ ok: true, ...result });
    }
    catch (err) {
        return res.status(500).json({ ok: false, error: err?.message || "Failed to generate image" });
    }
}
//# sourceMappingURL=generationController.js.map