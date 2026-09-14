import { error } from '@sveltejs/kit';
import { getPublicationArchive } from '$lib/api/publications';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const publication = await getPublicationArchive(params.id);
	if (!publication) return error(404, 'Publication not found.');
	return { publication };
}) satisfies PageServerLoad;
