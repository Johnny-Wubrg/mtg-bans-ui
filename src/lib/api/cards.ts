import { apiGet } from '$lib/api/utils';
import type { Card, CardNotorietySummary, FormatBans } from '$lib/models/Card';
import type { CardSearchResponse } from '$lib/models/Search';

export const getBanlist = (date: string) => apiGet<FormatBans[]>('/cards/bans?date=' + date);
export const getCard = (scryfallId: string) => apiGet<Card>(`/cards/${scryfallId}`);

export const searchCards = (query: string) =>
	apiGet<CardSearchResponse>(`/cards/search?q=${encodeURIComponent(query)}`);

export const getMostNotoriousCards = (limit: number) =>
	apiGet<CardNotorietySummary[]>(`/cards/notoriety?limit=${limit}`);
