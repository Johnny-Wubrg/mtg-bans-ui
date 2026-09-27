import { getFormats } from '$lib/api/formats';

export async function load() {
	return {
		formats: await getFormats(),
		description: 'Browse Magic: The Gathering formats and their banned and restricted card history.'
	};
}
