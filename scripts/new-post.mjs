import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const titleArgs = args[0] === '--' ? args.slice(1) : args;
const title = titleArgs.join(' ').trim();

if (!title) {
	console.error('Bitte gib einen Titel an: pnpm new-post "Mein Beitrag"');
	process.exitCode = 1;
} else {
	await createPost(title);
}

async function createPost(postTitle) {
	const slug = createSlug(postTitle);
	const postDirectory = path.resolve('src/content/blog');
	const postPath = path.join(postDirectory, `${slug}.md`);

	await mkdir(postDirectory, { recursive: true });

	if (await fileExists(postPath)) {
		throw new Error(`Der Beitrag existiert bereits: ${postPath}`);
	}

	const date = new Date().toISOString().slice(0, 10);
	const content = `---
title: ${quoteYamlString(postTitle)}
description: 'TODO: Kurze Zusammenfassung mit höchstens 160 Zeichen.'
pubDate: ${date}
tags: []
draft: true
---

Hier beginnt dein Beitrag.
`;

	await writeFile(postPath, content, 'utf8');
	console.log(`Entwurf erstellt: ${postPath}`);
}

function quoteYamlString(value) {
	return `'${value.replaceAll("'", "''")}'`;
}

function createSlug(value) {
	return value
		.toLocaleLowerCase('de-DE')
		.replaceAll('ä', 'ae')
		.replaceAll('ö', 'oe')
		.replaceAll('ü', 'ue')
		.replaceAll('ß', 'ss')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

async function fileExists(filePath) {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}
