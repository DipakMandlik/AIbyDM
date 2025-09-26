import OpenAI from "openai";

export const AllowedCategories = [
	"AI News",
	"New AI Tools",
	"Learning Tips",
	"Productivity Hacks",
	"AIbyDM Brand Highlights",
] as const;
export type PostCategory = typeof AllowedCategories[number];

function isPostCategory(value: any): value is PostCategory {
	return AllowedCategories.includes(value);
}

export interface GeneratedPost {
	id: string;
	category: PostCategory;
	title: string;
	linkedin: string; // long-form
	instagramCaption: string; // carousel-friendly caption
	youtubeScript: string; // short script
	hashtags: string[];
}

const openai = (() => {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) return null;
	return new OpenAI({ apiKey });
})();

function getBrandGuidelines(): string {
	return [
		"Brand: AIbyDM. Style: modern, confident, helpful.",
		"Tone: concise, insightful, and actionable. Avoid hype.",
		"Color palette inspiration: dark with neon blue/purple accents (design prompt only).",
		"Audience: AI professionals, builders, and lifelong learners.",
	].join("\n");
}

export async function generatePosts(count: number, categories: PostCategory[]): Promise<GeneratedPost[]> {
	// Fallback mock when no key
	if (!openai) {
		return Array.from({ length: count }).map((_, i) => ({
			id: `mock-${i + 1}`,
			category: categories[i % categories.length],
			title: `Sample ${categories[i % categories.length]} ${i + 1}`,
			linkedin: `Here is a detailed LinkedIn post for ${categories[i % categories.length]} (#${i + 1}).` ,
			instagramCaption: `IG caption for ${categories[i % categories.length]} ${i + 1} — swipe ➡️ for details! #AIbyDM`,
			youtubeScript: `Intro hook -> key points -> CTA. Topic: ${categories[i % categories.length]} ${i + 1}.`,
			hashtags: ["#AI", "#MachineLearning", "#Productivity", "#AIbyDM"],
		}));
	}

	const sys = `You are an expert content strategist and writer for AIbyDM.\n${getBrandGuidelines()}\nReturn crisp, structured outputs.`;
	const user = `Generate ${count} posts across these categories: ${categories.join(", ")}.\nFor each post, produce JSON with keys: id, category, title, linkedin, instagramCaption, youtubeScript, hashtags (array of lowercase snake-case tags).\nKeep LinkedIn 120-220 words; IG caption punchy with line breaks and emojis; YouTube script 60-90 seconds.`;

	const completion = await openai!.chat.completions.create({
		model: "gpt-4o-mini",
		response_format: { type: "json_object" },
		messages: [
			{ role: "system", content: sys },
			{ role: "user", content: user },
		],
		temperature: 0.8,
	});

	const content = completion.choices?.[0]?.message?.content || "{}";
	let parsed: any;
	try { parsed = JSON.parse(content); } catch { parsed = {}; }
	const items: Partial<GeneratedPost>[] = parsed.posts || parsed.items || parsed.data || [];
	// Basic normalization
	const normalized: GeneratedPost[] = (items as Partial<GeneratedPost>[]).map((p, idx) => {
		const categoryFallback: PostCategory = (categories && categories.length > 0)
			? categories[idx % categories.length]
			: AllowedCategories[0];
		const category: PostCategory = isPostCategory(p?.category) ? (p!.category as PostCategory) : categoryFallback;
		return {
			id: p?.id && String(p.id).trim().length > 0 ? String(p.id) : `gen-${idx + 1}`,
			category,
			title: p?.title || "Untitled",
			linkedin: p?.linkedin || "",
			instagramCaption: p?.instagramCaption || "",
			youtubeScript: p?.youtubeScript || "",
			hashtags: Array.isArray(p?.hashtags) ? (p!.hashtags as string[]) : ["#ai", "#aibydm"],
		};
	});
	return normalized;
}

export interface GeneratedImageResult {
	imageBase64: string; // PNG
	modelUsed: string;
}

export async function generateImage(prompt: string): Promise<GeneratedImageResult> {
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

