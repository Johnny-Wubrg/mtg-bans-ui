import type { PageServerLoad } from './$types';
import { getAnnouncements } from '$lib/api/announcements';

export const load = (async () => {
	const announcements = await getAnnouncements();
	return { announcements };
}) satisfies PageServerLoad;