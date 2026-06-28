export type Category = "all" | "dev" | "design" | "illustration";

export interface Project {
    id: number;
    title: string;
    category: Exclude<Categoyr, "all">;
    tag: string;
    image: string;
    images: string[];
    year: string;
    description: string;
    longDescription: string;
    stack: string[];
    liveUrl?: string;
    repoUrl?: string;
    role: string;
}