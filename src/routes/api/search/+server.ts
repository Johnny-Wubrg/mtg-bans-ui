import { searchProviders } from '$lib/server/search/providers';
import type { SmartSearchResponse } from '$lib/models/Search';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q')?.trim() ?? '';
	if (!query) return json({ groups: [] } satisfies SmartSearchResponse);

	const now = new Date();
	const groups = await Promise.all(
		searchProviders.map(async (provider) => {
			const result = await provider.search(query, { now });
			return {
				id: provider.id,
				label: provider.groupLabel,
				items: result.items,
				hasMore: result.hasMore ?? false,
				toggle: provider.showDisabledToggle
			};
		})
	);

	return json({ groups } satisfies SmartSearchResponse);
};
