import { getCollection } from 'astro:content';

type BlogPosts = Awaited<ReturnType<typeof getCollection<'blog'>>>;

function sortByNewest(posts: BlogPosts) {
	return posts.sort(
		(first, second) => second.data.pubDate.valueOf() - first.data.pubDate.valueOf(),
	);
}

export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return sortByNewest(posts);
}

export async function getVisiblePosts() {
	if (import.meta.env.PROD) {
		return getPublishedPosts();
	}

	return sortByNewest(await getCollection('blog'));
}
