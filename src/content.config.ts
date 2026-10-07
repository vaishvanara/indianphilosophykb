import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const kb = defineCollection({
  loader: glob({
    base: './src/content/kb',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .passthrough(),
});

const terms = defineCollection({
  loader: glob({
    base: './src/content/terms',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z
    .object({
      title: z.string().optional(),
      devanagari: z.string().optional(),
      iast: z.string().optional(),
      aliases: z.array(z.string()).default([]),
      lastUpdated: z
        .union([z.date(), z.string(), z.number()])
        .optional(),
      summary: z.string().optional(),
    })
    .passthrough(),
});

export const collections = {
  terms,
  kb,
};