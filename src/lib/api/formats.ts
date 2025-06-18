import { apiGet } from '$lib/api/utils';
import type { Format, FormatDetail } from '$lib/models/Format';

export const getFormats = () => apiGet<Format[]>('/formats');
export const getFormat = (slug: string) => apiGet<FormatDetail>(`/formats/${slug}`);
