<script lang="ts">
	import type { PageData } from './$types';
	import type { FormatBans } from '$lib/models/Card';
	import { convertDate, formatDate, formatIsoDate } from '$lib/utils/date';
	import Format from './components/Format.svelte';

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
	const now = new Date();
	const isFuture = date && convertDate(new Date(date)) > now;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>


<form action="/banlist" method="GET" data-sveltekit-reload>
	<input type="date" name="date" value={date} min="1993-08-05" max={formatIsoDate(now)} />
	<button>Time Travel!</button>
	{#if date}
		<button
			type="button"
			form="present"
			onclick={() => {
				window.location.href = '/banlist';
			}}>Return to Present
		</button
		>
	{/if}
</form>

{#if isFuture}
	<h2>Sorry, our banlist prediction AI is currently out of order.</h2>
{:else if !bans.length}
	<h2>You've gone too far back. This time period predates Magic: the Gathering.</h2>
{:else}
	{#each bans as format}
		<Format {format} />
	{/each}
{/if}