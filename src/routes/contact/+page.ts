export const load = ({ url }) => {
	return { reason: url.searchParams.get('reason') ?? 'general' };
};

export const prerender = true;
