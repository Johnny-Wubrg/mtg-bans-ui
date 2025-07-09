<script lang="ts">
	import { page } from '$app/state';
	import type { FormatDetail, FormatSnapshot } from '$lib/models/Format';
	import type { GraphMetric } from '$lib/models/Graphics';
	import CardList from '../../../components/cards/CardList.svelte';
	import FormattedDate from '../../../components/FormattedDate.svelte';
	import LineGraph from '../../../components/graphics/LineGraph.svelte';

	interface PageData {
		format: FormatDetail;
	}

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const format = $derived(data.format);

	let currentPage = $state('');
	let selectedDate = $state('');

	const limitations = $derived(
		format.timeline.find((e) => e.date === selectedDate)?.limitations ?? []
	);

	const limitationTypes = $derived(
		new Set(...format.timeline.map((t) => t.limitations.map((l) => l.status)))
	);

	const metrics: GraphMetric<FormatSnapshot, string, number>[] = $derived(
		[...limitationTypes].map((l) => ({
			label: l,
			nodes: format.timeline.map((snapshot) => {
				const count = snapshot.limitations.find((lm) => lm.status === l)?.cards.length ?? 0;
				return {
					value: snapshot,
					label: `${snapshot.date} (${count} cards ${l})`,
					x: snapshot.date,
					y: count
				};
			})
		}))
	);

	const xMax = new Date().toISOString().substring(0, 10);

	$effect(() => {
		if (page.params.slug !== currentPage) {
			selectedDate = format.timeline[format.timeline.length - 1].date;
			currentPage = page.params.slug;
		}
	});
</script>

{#key page.params.slug}
	<h1>{format.name}</h1>

	<h2>Timeline</h2>

	<ul>
		{#each format.events as evt}
			<li><FormattedDate date={evt.dateEffective} /> &mdash; {evt.description}</li>
		{/each}
	</ul>

	<h2>Banlist</h2>

	<LineGraph
		{metrics}
		getXValue={(x) => new Date(x).valueOf()}
		{xMax}
		onnodeclicked={(node) => (selectedDate = node.date)}
	/>

	{#if selectedDate}
		<FormattedDate date={selectedDate} />
	{/if}

	{#if !limitations.length}
		<p>No cards were banned or restricted at this time.</p>
	{/if}

	{#each limitations as limitation}
		<h3>{limitation.status} ({limitation.cards.length})</h3>
		<CardList cards={limitation.cards} classified />
	{/each}
{/key}
