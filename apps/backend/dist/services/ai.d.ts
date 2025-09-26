export declare const AllowedCategories: readonly ["AI News", "New AI Tools", "Learning Tips", "Productivity Hacks", "AIbyDM Brand Highlights"];
export type PostCategory = typeof AllowedCategories[number];
export interface GeneratedPost {
    id: string;
    category: PostCategory;
    title: string;
    linkedin: string;
    instagramCaption: string;
    youtubeScript: string;
    hashtags: string[];
}
export declare function generatePosts(count: number, categories: PostCategory[]): Promise<GeneratedPost[]>;
export interface GeneratedImageResult {
    imageBase64: string;
    modelUsed: string;
}
export declare function generateImage(prompt: string): Promise<GeneratedImageResult>;
//# sourceMappingURL=ai.d.ts.map