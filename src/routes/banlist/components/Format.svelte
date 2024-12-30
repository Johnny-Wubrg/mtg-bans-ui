<script lang="ts">
	import CardList from '../../../components/cards/CardList.svelte';
	import type { FormatBans } from '$lib/models/Card.js';

	interface Props {
		format: FormatBans;
	}

	const { format }: Props = $props();
	
	const hasBan = format.banned?.length || format.restricted?.length;
</script>

<h2>{format.format}</h2>

{#if format.banned.length}
	<h3>Banned ({format.banned.length})</h3>
	<CardList cards={format.banned} classified />
{/if}

{#if format.restricted.length}
	<h3>Restricted ({format.restricted.length})</h3>
	<CardList cards={format.restricted} classified />
{/if}

{#if !hasBan}
	<p>No cards are currently banned or restricted.</p>
{/if}