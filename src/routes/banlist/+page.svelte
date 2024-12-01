<script lang="ts">
	import type { PageData } from './$types';
	import type { FormatBans } from '$lib/models/Card';
	import CardLink from '../../components/CardLink.svelte';

	interface Props {
		data: PageData;
	}

	interface Data {
		bans: FormatBans[];
	}

	const { data }: Props = $props();
	const { bans }: Data = data;
</script>

<svelte:head>
	<title>Historical Banlist</title>
</svelte:head>

{#each bans as format}
	<h2>{format.format}</h2>
	{#if format.banned.length}
		<h3>Banned</h3>

		<ul>
			{#each format.banned as card}
				<li>
					<CardLink {card} />
				</li>
			{/each}
		</ul>
	{/if}
	{#if format.restricted.length}
		<h3>Restricted</h3>

		<ul>
			{#each format.restricted as card}
				<li>
					<CardLink {card} />
				</li>
			{/each}
		</ul>
	{/if}
{/each}

