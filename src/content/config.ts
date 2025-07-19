import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    author: z.string().default('Your Name'),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
