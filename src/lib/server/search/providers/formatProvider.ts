import { getFormats } from '$lib/api/formats';
import type { Format } from '$lib/models/Format';
import type { SearchProvider } from '../types';

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { formats: Format[]; expiresAt: number } | null = null;

const loadFormats = async (): Promise<Format[]> => {
	if (cache && cache.expiresAt > Date.now()) return cache.formats;
	const formats = await getFormats();
	cache = { formats, expiresAt: Date.now() + CACHE_TTL_MS };
	return formats;
};

const matchFormat = (format: Format, term: string) => {
	if (format.name.toLowerCase().includes(term)) return format.name + ' Format';

	const alias = format.aliases.find((alias) => alias.toLowerCase().includes(term));
	return alias ? `${format.name} Format (aka ${alias})` : null;
};

export const formatProvider: SearchProvider = {
	id: 'formats',
	groupLabel: 'Formats',
	search: async (query) => {
		const term = query.trim().toLowerCase();
		if (!term) return { items: [] };

		const formats = await loadFormats();
		const items = formats.flatMap((format) => {
			const label = matchFormat(format, term);
			return label ? [{ id: format.slug, label, href: `/formats/${format.slug}` }] : [];
		});

		return { items };
	}
};
