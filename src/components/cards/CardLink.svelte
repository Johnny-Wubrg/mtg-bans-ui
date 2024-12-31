<script lang="ts">
	import type { Card } from '$lib/models/Card';

	interface Props {
		card: Card;
	}

	const { card }: Props = $props();
</script>

<a href={card.scryfallUri} data-image-preview={card.scryfallImageUri} data-image-ratio={7 / 5}
	>{card.name}</a
>
