import { searchCards } from '$lib/api/cards';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	const response = await searchCards(query);
	return json(response ?? { results: [], hasMore: false });
};
