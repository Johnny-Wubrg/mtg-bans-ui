<script lang="ts">
	import CardList from '../../../components/cards/CardList.svelte';
	import type { FormatBans } from '$lib/models/Card.js';

	interface Props {
		format: FormatBans;
	}

	const { format }: Props = $props();

	const hasBan = format.limitations.length;
</script>

<h2>{format.format}</h2>

{#each format.limitations as limitation}
	<h3>{limitation.status} ({limitation.cards.length})</h3>
	<CardList cards={limitation.cards} classified />
{/each}

{#if !hasBan}
	<p>No cards are currently banned or restricted.</p>
{/if}
