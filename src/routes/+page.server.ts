import type { PageServerLoad } from './$types';
import { getAnnouncements } from '$lib/api/announcements';
import { getMostNotoriousCards } from '$lib/api/cards';
import { getLatestAnnouncement } from '$lib/utils/announcements';

export const load = (async () => {
	const announcements = await getAnnouncements();
	const latestAnnouncement = getLatestAnnouncement(announcements);
	const mostNotoriousCards = await getMostNotoriousCards(5);

	return { latestAnnouncement, mostNotoriousCards };
}) satisfies PageServerLoad;
