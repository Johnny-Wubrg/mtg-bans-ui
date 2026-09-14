import { apiGet } from '$lib/api/utils';
import type { PublicationArchive } from '$lib/models/Publication';

export const getPublicationArchive = (id: number | string) =>
	apiGet<PublicationArchive>(`/publications/${id}`);
