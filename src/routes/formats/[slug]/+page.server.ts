import { getFormat } from '$lib/api/formats';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const format = await getFormat(params.slug);
	if (!format) return error(404, 'Format not found.');
	return {
		format,
		description: `The banned and restricted card history and timeline for ${format.name}.`
	};
}

export const prerender = true;
