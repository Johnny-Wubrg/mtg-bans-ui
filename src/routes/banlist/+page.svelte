<script lang="ts">
	import type { PageData } from './$types';
	import type { FormatBans } from '$lib/models/Card';
	import { convertDate, formatDate } from '$lib/utils/date';
	import Format from './components/Format.svelte';
	import PageTitle from '../../components/layout/PageTitle.svelte';
	import TimeMachine from './components/TimeMachine.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';

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
	{#if date}
		<title>{PUBLIC_APP_NAME} {title}</title>
	{:else}
		<title>Magic: the Gathering Banned & Restricted Lists | {PUBLIC_APP_NAME}</title>
	{/if}
</svelte:head>

<PageTitle>{title}</PageTitle>

<TimeMachine {date} {now} />

{#if isFuture}
	<h2>Sorry, our banlist prediction AI is currently out of order.</h2>
{:else if !bans.length}
	<h2>You've gone too far back. This time period predates Magic: the Gathering.</h2>
{:else}
	{#each bans as format}
		<Format {format} />
	{/each}
{/if}
