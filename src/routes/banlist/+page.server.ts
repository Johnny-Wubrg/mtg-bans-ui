import type { PageServerLoad } from './$types';
import { getBanlist } from '$lib/api/cards';
import { error } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	const date = url.searchParams.get('date');

	if (date && new Date(date).toString() === 'Invalid Date') return error(404, 'Not Found');

	const bans = await getBanlist(date ?? '');
	return { date, bans };
}) satisfies PageServerLoad;
