import type { PageServerLoad } from './$types';
import { getAnnouncements } from '$lib/api/announcements';

export const load = (async () => {
	const announcements = await getAnnouncements();
	return {
		announcements,
		description:
			'A complete timeline of Magic: The Gathering banned and restricted list announcements, with sources and card-by-card changes.'
	};
}) satisfies PageServerLoad;
