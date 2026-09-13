import type { CardSearchResult } from '$lib/models/Search';

export const searchCards = async (query: string): Promise<CardSearchResult[]> => {
	const response = await fetch(`/api/cards/search?q=${encodeURIComponent(query)}`);
	if (!response.ok) return [];
	return response.json();
};
