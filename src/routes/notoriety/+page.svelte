<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import PageTitle from '../../components/layout/PageTitle.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const cards = $derived(data.cards);
</script>

<svelte:head>
	<title>Most Notorious Cards | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>Most Notorious Cards</PageTitle>

<p class="intro">
	The top 100 cards, ranked by our <a href="/notoriety/about">notoriety index</a>.
</p>

<div class="grid">
	{#each cards as card}
		<a class="card" href={`/cards/${card.scryfallId}`}>
			<img src={card.scryfallImageUri} alt={card.name} loading="lazy" />
		</a>
	{/each}
</div>

<style lang="scss">
	.intro {
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
		gap: 1em;
		margin-top: 2em;
	}

	.card img {
		display: block;
		width: 100%;
		border-radius: 0.5em;
	}
</style>
