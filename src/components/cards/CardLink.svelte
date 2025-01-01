<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { trackCustomEvent } from '$lib/utils/tracking';

	interface Props {
		card: Card;
	}

	const { card }: Props = $props();
	const trackVisit = () => trackCustomEvent('Scryfall Visit', { card: card.name });
</script>

<a
	href={card.scryfallUri}
	data-image-preview={card.scryfallImageUri}
	data-image-ratio={7 / 5}
	onmousedown={trackVisit}
	ontouchstart={trackVisit}>{card.name}</a
>
