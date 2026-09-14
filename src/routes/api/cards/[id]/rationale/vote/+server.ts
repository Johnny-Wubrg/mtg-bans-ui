import { voteOnRationale } from '$lib/api/cards';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const { direction }: { direction: 1 | -1 } = await request.json();
	const success = await voteOnRationale(params.id, direction);

	return json(null, { status: success ? 204 : 502 });
};
