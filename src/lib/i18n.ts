import type { Language } from './posts';

const translatedPaths = new Set([
	'/',
	'/about/',
	'/blog/',
	'/rss/',
	'/credits/',
	'/blog/meine-ankunft/',
	'/blog/mein-erster-tag-in-kanada/',
]);

export function languageFromPath(pathname: string): Language {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

export function localizedPath(path: string, language: Language) {
	return language === 'en' ? `/en${path === '/' ? '/' : path}` : path;
}

export function alternateLanguagePath(pathname: string) {
	const language = languageFromPath(pathname);
	const germanPath = language === 'en' ? pathname.replace(/^\/en(?=\/|$)/, '') || '/' : pathname;
	const normalized = germanPath.endsWith('/') ? germanPath : `${germanPath}/`;
	if (!translatedPaths.has(normalized)) return undefined;
	return language === 'en' ? normalized : localizedPath(normalized, 'en');
}
