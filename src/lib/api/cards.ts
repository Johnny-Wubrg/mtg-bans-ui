import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { apiGet } from '$lib/api/utils';
import type { Card, FormatBans } from '$lib/models/Card';
import type { CardSearchResponse } from '$lib/models/Search';

export const getBanlist = (date: string) => apiGet<FormatBans[]>('/cards/bans?date=' + date);
export const getCard = (scryfallId: string) => apiGet<Card>(`/cards/${scryfallId}`);

export const searchCards = (query: string) =>
	apiGet<CardSearchResponse>(`/cards/search?q=${encodeURIComponent(query)}`);

export const voteOnRationale = async (scryfallId: string, direction: 1 | -1): Promise<boolean> => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/cards/${scryfallId}/rationale/vote`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ direction })
	});

	return response.ok;
};
