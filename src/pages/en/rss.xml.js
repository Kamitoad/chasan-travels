import rss from '@astrojs/rss';
import { SITE_DESCRIPTION_EN, SITE_TITLE } from '../../consts';
import { getPublishedPosts, postUrl } from '../../lib/posts';

export async function GET(context) {
	const posts = await getPublishedPosts('en');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION_EN,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: postUrl(post.id, 'en'),
		})),
	});
}
