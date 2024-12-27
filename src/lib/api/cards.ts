import { apiGet } from '$lib/api/utils';
import type { FormatBans } from '$lib/models/Card';

export const getBanlist = (date: string) => apiGet<FormatBans[]>('/cards/bans?date=' + date);
