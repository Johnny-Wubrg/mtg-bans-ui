<script lang="ts">
	import type { Card } from '$lib/models/Card';

	interface Props {
		card: Card;
	}

	const { card }: Props = $props();
</script>

<a href={card.scryfallUri}>{card.name}</a>
