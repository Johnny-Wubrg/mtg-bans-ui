<script lang="ts">
	import type { PageData } from './$types';
	import type { FormatBans } from '$lib/models/Card';
	import CardList from '../../components/cards/CardList.svelte';
	import { invalidateAll } from '$app/navigation';
	import { formatDate } from '$lib/utils/date';

	interface Props {
		data: PageData;
	}

	interface Data {
		date: string | null;
		bans: FormatBans[];
	}

	const { data }: Props = $props();
	const { date, bans }: Data = data;

	const title = date ? `Historical Banlist - ${formatDate(date)}` : 'Current Banlist';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form action="/banlist" method="GET" data-sveltekit-reload>
	<input type="date" name="date" value={date} />
	<button>Time Travel!</button>
	{#if date}
		<button
			type="button"
			form="present"
			onclick={() => {
				window.location.href = '/banlist';
			}}>Return to Present</button
		>
	{/if}
</form>

{#each bans as format}
	{@const hasBan = format.banned?.length || format.restricted?.length}
	<h2>{format.format}</h2>
	{#if format.banned.length}
		<h3>Banned</h3>
		<CardList cards={format.banned} classified />
	{/if}
	{#if format.restricted.length}
		<h3>Restricted</h3>
		<CardList cards={format.restricted} classified />
	{/if}
	{#if !hasBan}
		<p>No cards are currently banned or restricted.</p>
	{/if}
{/each}

{#if !bans.length}
	<h2>You've gone too far back.</h2>
{/if}