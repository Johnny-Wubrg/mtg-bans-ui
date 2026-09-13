import type { CardSearchResponse } from '$lib/models/Search';

export const searchCards = async (query: string): Promise<CardSearchResponse> => {
	const response = await fetch(`/api/cards/search?q=${encodeURIComponent(query)}`);
	if (!response.ok) return { results: [], hasMore: false };
	return response.json();
};
