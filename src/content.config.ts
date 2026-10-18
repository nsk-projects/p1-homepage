// src/content.config.ts
// Astro 5 콘텐츠 레이어 방식: glob 로더로 src/content/devlog/*.md 를 읽는다.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const devlog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/devlog" }),
  schema: z.object({
    title: z.string(),
    state: z.enum(["decide", "build"]),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = {
  devlog,
};
