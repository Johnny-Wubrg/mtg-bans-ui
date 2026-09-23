import type { SmartSearchResponse } from '$lib/models/Search';

export const smartSearch = async (query: string): Promise<SmartSearchResponse> => {
	const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
	if (!response.ok) return { groups: [] };
	return response.json();
};
