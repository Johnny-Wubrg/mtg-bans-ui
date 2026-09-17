import { voteOnRationale } from '$lib/server/api/cards';
import { verifyVoteToken } from '$lib/server/voteToken';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { VoteRequestBody } from './models';

export const POST: RequestHandler = async ({ params, request }) => {
	const { direction, voteToken }: VoteRequestBody = await request.json();

	const payload = await verifyVoteToken(voteToken);
	if (!payload || payload.scryfallId !== params.id) {
		return json({ message: 'Invalid vote token.' }, { status: 400 });
	}

	const response = await voteOnRationale(params.id, direction, payload.nonce);

	if (response.status === 204) return new Response(null, { status: 204 });
	if (response.status === 404) return json({ message: 'Rationale not found.' }, { status: 404 });
	if (response.status === 409) return json({ message: 'Vote already submitted.' }, { status: 409 });

	return json({ message: 'Failed to submit vote.' }, { status: 502 });
};
