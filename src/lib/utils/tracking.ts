import { browser } from '$app/environment';

export const trackCustomEvent = (evt: string, props: Record<string, string>) => {
	if (!browser) return;
	if (!('plausible' in window)) {
		return console.log(`Tracked Event: ${evt}`, props);
	}

	const plausible = window.plausible as (...args: unknown[]) => void;
	plausible(evt, { props });
};
