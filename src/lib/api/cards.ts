import { apiGet } from '$lib/api/utils';
import type { Card, FormatBans } from '$lib/models/Card';

export const getBanlist = (date: string) => apiGet<FormatBans[]>('/cards/bans?date=' + date);
export const getCard = (scryfallId: string) => apiGet<Card>(`/cards/${scryfallId}`);
