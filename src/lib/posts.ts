import { getCollection } from 'astro:content';

export type Language = 'de' | 'en';

type BlogPosts = Awaited<ReturnType<typeof getCollection<'blog'>>>;

function sortByNewest(posts: BlogPosts) {
	return posts.sort(
		(first, second) => second.data.pubDate.valueOf() - first.data.pubDate.valueOf(),
	);
}

export function postUrl(id: string, language: Language) {
	const slug = language === 'en' ? id.replace(/^en\//, '') : id;
	return `${language === 'en' ? '/en' : ''}/blog/${slug}/`;
}

export async function getPublishedPosts(language: Language = 'de') {
	const posts = await getCollection(
		'blog',
		({ data }) => !data.draft && data.language === language,
	);
	return sortByNewest(posts);
}

export async function getVisiblePosts(language: Language = 'de') {
	if (import.meta.env.PROD) {
		return getPublishedPosts(language);
	}

	return sortByNewest(await getCollection('blog', ({ data }) => data.language === language));
}
