import type { PageServerLoad } from './$types';
import { getMostNotoriousCards } from '$lib/api/cards';

export const load = (async () => {
	const cards = await getMostNotoriousCards(100);

	return {
		cards,
		description:
			'The top 100 most notorious Magic: The Gathering cards, ranked by ban and restriction history.'
	};
}) satisfies PageServerLoad;
