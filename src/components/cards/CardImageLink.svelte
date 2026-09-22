<script lang="ts">
	interface LinkedCard {
		scryfallId: string;
		name: string;
		scryfallImageUri: string;
	}

	interface Props {
		card: LinkedCard;
	}

	const { card }: Props = $props();
</script>

<a class="card" href={`/cards/${card.scryfallId}`}>
	<img src={card.scryfallImageUri} alt={card.name} loading="lazy" />
	<span class="name">{card.name}</span>
</a>

<style lang="scss">
	.card {
		display: block;
		position: relative;
	}

	img {
		display: block;
		width: 100%;
		border-radius: 0.5em;
	}

	.name {
		position: absolute;
		top: 0.5em;
		left: 1em;
		font-size: 0.875em;
		pointer-events: none;
		white-space: nowrap;
		border: 0;
		color: transparent;
	}
</style>
