import type { PageServerLoad } from './$types';
import { getAnnouncements } from '$lib/api/announcements';
import { getLatestAnnouncement } from '$lib/utils/announcements';

export const load = (async () => {
	const announcements = await getAnnouncements();
	const latestAnnouncement = getLatestAnnouncement(announcements);

	return { latestAnnouncement };
}) satisfies PageServerLoad;
