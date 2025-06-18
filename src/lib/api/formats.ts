import { apiGet } from '$lib/api/utils';
import type { Format } from '$lib/models/Format';

export const getFormats = () => apiGet<Format[]>('/formats');
