import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string().trim().min(1),
				description: z.string().trim().min(1).max(160),
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				location: z.string().trim().min(1).optional(),
				tags: z.array(z.string().trim().min(1)).default([]),
				draft: z.boolean().default(false),
				heroImage: image().optional(),
				heroImageAlt: z.string().trim().min(1).optional(),
				heroImageCaption: z.string().trim().min(1).optional(),
				heroImageCredit: z.string().trim().min(1).optional(),
				heroImageCreditUrl: z.url().optional(),
			})
			.superRefine((post, context) => {
				if (post.heroImage && !post.heroImageAlt) {
					context.addIssue({
						code: 'custom',
						path: ['heroImageAlt'],
						message: 'Für ein Titelbild ist ein beschreibender Alternativtext erforderlich.',
					});
				}
				if (post.heroImageCreditUrl && !post.heroImageCredit) {
					context.addIssue({
						code: 'custom',
						path: ['heroImageCredit'],
						message: 'Für einen Bildnachweis-Link muss ein lesbarer Urhebername angegeben sein.',
					});
				}
			}),
});

export const collections = { blog };
