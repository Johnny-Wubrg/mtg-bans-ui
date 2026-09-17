import { PRIVATE_VOTE_TOKEN_SECRET } from '$env/static/private';

interface VoteTokenPayload {
	scryfallId: string;
	nonce: string;
}

const encoder = new TextEncoder();

const getKey = () =>
	crypto.subtle.importKey(
		'raw',
		encoder.encode(PRIVATE_VOTE_TOKEN_SECRET),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify']
	);

const toBase64Url = (bytes: ArrayBuffer | Uint8Array): string => {
	const binary = String.fromCharCode(...new Uint8Array(bytes));
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value: string): Uint8Array => {
	const padded = value
		.replace(/-/g, '+')
		.replace(/_/g, '/')
		.padEnd(Math.ceil(value.length / 4) * 4, '=');
	return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
};

export const createVoteToken = async (payload: VoteTokenPayload): Promise<string> => {
	const payloadB64 = toBase64Url(encoder.encode(JSON.stringify(payload)));
	const signature = await crypto.subtle.sign('HMAC', await getKey(), encoder.encode(payloadB64));
	return `${payloadB64}.${toBase64Url(signature)}`;
};

export const verifyVoteToken = async (token: string): Promise<VoteTokenPayload | null> => {
	const [payloadB64, signature] = token.split('.');
	if (!payloadB64 || !signature) return null;

	const valid = await crypto.subtle.verify(
		'HMAC',
		await getKey(),
		fromBase64Url(signature),
		encoder.encode(payloadB64)
	);
	if (!valid) return null;

	try {
		return JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
	} catch {
		return null;
	}
};
