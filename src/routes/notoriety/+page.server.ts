import type { PageServerLoad } from './$types';
import { getMostNotoriousCards } from '$lib/api/cards';

export const load = (async () => {
	const cards = await getMostNotoriousCards(100);

	return { cards };
}) satisfies PageServerLoad;
