import type { PageServerLoad } from './$types';
import { getAnnouncements } from '$lib/api/announcements';
import { getBanlist } from '$lib/api/cards';

export const load = (async () => {
	const bans = await getBanlist('');
	return { bans };
}) satisfies PageServerLoad;