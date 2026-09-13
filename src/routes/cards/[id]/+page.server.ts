import { getCard } from '$lib/api/cards';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const card = await getCard(params.id);
	if (!card) return error(404, 'Card not found.');
	return {
		card
	};
}) satisfies PageServerLoad;
