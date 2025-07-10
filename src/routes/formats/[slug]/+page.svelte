<script lang="ts">
	import { page } from '$app/state';
	import type { FormatDetail, FormatSnapshot } from '$lib/models/Format';
	import type { GraphColor, GraphMetric } from '$lib/models/Graphics';
	import CardList from '../../../components/cards/CardList.svelte';
	import FormattedDate from '../../../components/FormattedDate.svelte';
	import StepperGraph from '../../../components/graphics/StepperGraph.svelte';

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
		format.timeline
			.flatMap((t) => t.limitations.map((l) => ({ status: l.status, color: l.color })))
			.filter(
				(item, index, array) => array.findIndex((other) => other.status === item.status) === index
			)
	);

	const metrics: GraphMetric<FormatSnapshot, Date, number>[] = $derived(
		[...limitationTypes].map((l) => {
			const allNodes = format.timeline.map((snapshot) => {
				const count = snapshot.limitations.find((lm) => lm.status === l.status)?.cards.length ?? 0;
				return {
					value: snapshot,
					label: `${snapshot.date} (${count} cards ${l.status})`,
					x: new Date(snapshot.date),
					y: count
				};
			});

			// Find the first index where y is non-zero
			const firstNonZeroIndex = allNodes.findIndex((node) => node.y > 0);

			return {
				label: l.status,
				color: l.color ?? 'white',
				nodes: firstNonZeroIndex === -1 ? [] : allNodes.slice(firstNonZeroIndex)
			};
		})
	);

	const xMin = $derived(
		new Date(Math.min(...format.events.map((e) => new Date(e.dateEffective).valueOf())))
	);
	const xMax = new Date();

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

	<StepperGraph
		{metrics}
		{xMin}
		{xMax}
		yMin={0}
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
