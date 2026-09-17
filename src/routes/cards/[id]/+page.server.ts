import { getCard } from '$lib/api/cards';
import { issueRationaleVoteNonce } from '$lib/server/api/cards';
import { createVoteToken } from '$lib/server/voteToken';
import { needsRationaleReview } from '$lib/utils/rationale';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const card = await getCard(params.id);
	if (!card) return error(404, 'Card not found.');

	const voteToken = needsRationaleReview(card.rationale) ? await mintVoteToken(params.id) : null;

	return {
		card,
		voteToken
	};
}) satisfies PageServerLoad;

const mintVoteToken = async (scryfallId: string): Promise<string | null> => {
	const nonce = await issueRationaleVoteNonce(scryfallId);
	return nonce ? await createVoteToken({ scryfallId, nonce }) : null;
};
