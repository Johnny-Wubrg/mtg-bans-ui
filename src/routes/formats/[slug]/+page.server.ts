import { getFormat } from '$lib/api/formats';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const format = await getFormat(params.slug);
	if (!format) return error(404, 'Format not found.');
	return {
		format
	};
}

export const prerender = true;
