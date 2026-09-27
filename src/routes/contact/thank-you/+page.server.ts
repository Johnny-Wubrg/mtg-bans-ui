import type { PageServerLoad } from './$types';

export const load = (async () => {
	return { maintenanceExempt: true };
}) satisfies PageServerLoad;

export const prerender = true;
