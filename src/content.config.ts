import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.date(),
    tags: z.array(z.string()).min(1),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    related: z.array(z.object({
      title: z.string(),
      url: z.string()
    })).optional(),
    draft: z.boolean().optional(),
  })
});

export const collections = { blog };
