import type { PageServerLoad } from './$types';
import { getBanlist } from '$lib/api/cards';
import { error } from '@sveltejs/kit';
import { formatDateString } from '$lib/utils/date';

export const load = (async ({ url }) => {
	const date = url.searchParams.get('date');

	if (date && new Date(date).toString() === 'Invalid Date') return error(404, 'Not Found');

	const bans = await getBanlist(date ?? '');

	const description = date
		? `The Magic: The Gathering banned and restricted list as it stood on ${formatDateString(date)}.`
		: 'The current Magic: The Gathering banned and restricted list across all major formats.';

	return { date, bans, description };
}) satisfies PageServerLoad;
