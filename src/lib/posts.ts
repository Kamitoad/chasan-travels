import { getCollection } from 'astro:content';

export type Language = 'de' | 'en';

type BlogPosts = Awaited<ReturnType<typeof getCollection<'blog'>>>;

export function formatEntryNumber(entryNumber: number | undefined) {
	return entryNumber === undefined ? '—' : String(entryNumber).padStart(2, '0');
}

async function getNumberedPosts() {
	const posts = await getCollection('blog');
	const numbersByStory = new Map<string, number>();
	const storiesByNumber = new Map<number, string>();
	for (const post of posts) {
		const { entryNumber } = post.data;
		if (entryNumber === undefined) continue;
		const story = post.id.replace(/^en\//, '');
		const existingNumber = numbersByStory.get(story);
		const existingStory = storiesByNumber.get(entryNumber);
		if (existingNumber !== undefined && existingNumber !== entryNumber) {
			throw new Error(`Die Sprachfassungen von „${story}“ haben unterschiedliche Beitragsnummern.`);
		}
		if (existingStory !== undefined && existingStory !== story) {
			throw new Error(
				`Beitragsnummer ${entryNumber} ist für „${existingStory}“ und „${story}“ vergeben.`,
			);
		}
		numbersByStory.set(story, entryNumber);
		storiesByNumber.set(entryNumber, story);
	}
	return posts;
}

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
	const posts = (await getNumberedPosts()).filter(
		({ data }) => !data.draft && data.language === language,
	);
	return sortByNewest(posts);
}

export async function getVisiblePosts(language: Language = 'de') {
	if (import.meta.env.PROD) {
		return getPublishedPosts(language);
	}

	return sortByNewest((await getNumberedPosts()).filter(({ data }) => data.language === language));
}
