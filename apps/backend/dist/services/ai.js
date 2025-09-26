"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedCategories = void 0;
exports.generatePosts = generatePosts;
exports.generateImage = generateImage;
const openai_1 = __importDefault(require("openai"));
exports.AllowedCategories = [
    "AI News",
    "New AI Tools",
    "Learning Tips",
    "Productivity Hacks",
    "AIbyDM Brand Highlights",
];
function isPostCategory(value) {
    return exports.AllowedCategories.includes(value);
}
const openai = (() => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
        return null;
    return new openai_1.default({ apiKey });
})();
function getBrandGuidelines() {
    return [
        "Brand: AIbyDM. Style: modern, confident, helpful.",
        "Tone: concise, insightful, and actionable. Avoid hype.",
        "Color palette inspiration: dark with neon blue/purple accents (design prompt only).",
        "Audience: AI professionals, builders, and lifelong learners.",
    ].join("\n");
}
async function generatePosts(count, categories) {
    // Fallback mock when no key
    if (!openai) {
        return Array.from({ length: count }).map((_, i) => {
            const cat = (categories.length ? categories[i % categories.length] : exports.AllowedCategories[0]);
            return {
                id: `mock-${i + 1}`,
                category: cat,
                title: `Sample ${cat} ${i + 1}`,
                linkedin: `Here is a detailed LinkedIn post for ${cat} (#${i + 1}).`,
                instagramCaption: `IG caption for ${cat} ${i + 1} — swipe ➡️ for details! #AIbyDM`,
                youtubeScript: `Intro hook -> key points -> CTA. Topic: ${cat} ${i + 1}.`,
                hashtags: ["#AI", "#MachineLearning", "#Productivity", "#AIbyDM"],
            };
        });
    }
    const sys = `You are an expert content strategist and writer for AIbyDM.\n${getBrandGuidelines()}\nReturn crisp, structured outputs.`;
    const user = `Generate ${count} posts across these categories: ${categories.join(", ")}.\nFor each post, produce JSON with keys: id, category, title, linkedin, instagramCaption, youtubeScript, hashtags (array of lowercase snake-case tags).\nKeep LinkedIn 120-220 words; IG caption punchy with line breaks and emojis; YouTube script 60-90 seconds.`;
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
            { role: "system", content: sys },
            { role: "user", content: user },
        ],
        temperature: 0.8,
    });
    const content = completion.choices?.[0]?.message?.content || "{}";
    let parsed;
    try {
        parsed = JSON.parse(content);
    }
    catch {
        parsed = {};
    }
    const items = parsed.posts || parsed.items || parsed.data || [];
    // Basic normalization
    const normalized = items.map((p, idx) => {
        const categoryFallback = (categories.length > 0)
            ? categories[idx % categories.length]
            : exports.AllowedCategories[0];
        const inputCat = (p && "category" in p ? p.category : undefined);
        const category = isPostCategory(inputCat) ? inputCat : categoryFallback;
        return {
            id: p?.id && String(p.id).trim().length > 0 ? String(p.id) : `gen-${idx + 1}`,
            category,
            title: p?.title || "Untitled",
            linkedin: p?.linkedin || "",
            instagramCaption: p?.instagramCaption || "",
            youtubeScript: p?.youtubeScript || "",
            hashtags: Array.isArray(p?.hashtags) ? p.hashtags : ["#ai", "#aibydm"],
        };
    });
    return normalized;
}
async function generateImage(prompt) {
    if (!openai) {
        // Transparent 1x1 PNG
        const transparentPng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAukB9pQe1pYAAAAASUVORK5CYII=";
        return { imageBase64: transparentPng, modelUsed: "placeholder" };
    }
    const fullPrompt = [
        prompt,
        "Design language: dark background, neon blue/purple accents, clean typography, iconography for AI.",
        "Brand: AIbyDM.",
    ].join("\n");
    const img = await openai.images.generate({
        model: "gpt-image-1",
        prompt: fullPrompt,
        size: "1024x1024",
        background: "transparent",
    });
    const b64 = img.data?.[0]?.b64_json || "";
    return { imageBase64: b64, modelUsed: "gpt-image-1" };
}
//# sourceMappingURL=ai.js.map