import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const terms = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/terms' }),
  schema: z.object({
    title: z.string(),
    devanagari: z.string().optional(),
    iast: z.string().optional(),
    aliases: z.array(z.string()).default([]),
    lastUpdated: z.union([z.date(), z.string()]).optional(),
    summary: z.string().optional(),
  }),
});

const kb = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kb' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { terms, kb };
