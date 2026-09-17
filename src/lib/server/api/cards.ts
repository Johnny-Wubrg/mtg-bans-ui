import { PRIVATE_API_KEY } from '$env/static/private';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

const headers = {
	'Content-Type': 'application/json',
	'X-Api-Key': PRIVATE_API_KEY
};

export const issueRationaleVoteNonce = async (scryfallId: string): Promise<string | null> => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/cards/${scryfallId}/rationale/vote/nonce`, {
		method: 'POST',
		headers
	});

	if (!response.ok) return null;

	const { nonce }: { nonce: string } = await response.json();
	return nonce;
};

export const voteOnRationale = (
	scryfallId: string,
	direction: 1 | -1,
	nonce: string
): Promise<Response> =>
	fetch(`${PUBLIC_API_BASE_URL}/cards/${scryfallId}/rationale/vote`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ direction, nonce })
	});
