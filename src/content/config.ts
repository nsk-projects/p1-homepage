// src/content/config.ts
import { defineCollection, z } from "astro:content";

const devlog = defineCollection({
  type: "content",
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
