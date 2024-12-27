import type { PageServerLoad } from './$types';
import { getBanlist } from '$lib/api/cards';

export const load = (async ({ url }) => {
	const date = url.searchParams.get('date');
	const bans = await getBanlist(date ?? '');
	return { date, bans };
}) satisfies PageServerLoad;
