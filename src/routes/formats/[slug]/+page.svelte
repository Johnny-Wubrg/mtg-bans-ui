<script lang="ts">
	import { page } from '$app/state';
	import type { FormatDetail, FormatSnapshot } from '$lib/models/Format';
	import type { GraphColor, GraphMetric, GraphNode } from '$lib/models/Graphics';
	import { convertDate, formatDateString, formatIsoDate } from '$lib/utils/date';
	import { trackCustomEvent } from '$lib/utils/tracking';
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

	let possibleDates = $derived(format.timeline.map((e) => e.date));

	const limitationTypes = $derived(
		format.timeline
			.flatMap((t) => t.limitations.map((l) => ({ status: l.status, color: l.color })))
			.filter(
				(item, index, array) => array.findIndex((other) => other.status === item.status) === index
			)
	);

	const metrics: GraphMetric<FormatSnapshot, Date, number>[] = $derived(
		[...limitationTypes].map((l) => {
			const allNodes = format.timeline.reduce(
				(agg, snapshot, i) => {
					const previousCards =
						i === 0
							? []
							: format.timeline[i - 1].limitations.find((lm) => lm.status === l.status)?.cards;

					const cards = snapshot.limitations.find((lm) => lm.status === l.status)?.cards;
					const count = cards?.length ?? 0;

					if (
						(!agg.length && count === 0) ||
						previousCards?.map((c) => c.scryfallId).join(',') ===
							cards?.map((c) => c.scryfallId).join(',')
					) {
						return agg;
					}

					const next = {
						value: snapshot,
						label: `${snapshot.date} (${count} cards ${l.status})`,
						x: convertDate(new Date(snapshot.date)),
						y: count
					};

					agg.push(next);

					return agg;
				},
				[] as GraphNode<FormatSnapshot, Date, number>[]
			);

			return {
				label: l.status,
				color: l.color ?? 'white',
				nodes: allNodes
			};
		})
	);

	const xMin = $derived(
		new Date(
			Math.min(...format.events.map((e) => convertDate(new Date(e.dateEffective)).valueOf()))
		)
	);
	const xMax = new Date();

	const trackTimeTravel = (mode: string) =>
		trackCustomEvent('Time Travel', {
			origin: `Format - ${format.name}`,
			mode,
			date: selectedDate
		});

	const selectDate = (date: Date) => {
		selectedDate = formatIsoDate(date);
		trackTimeTravel('Graph');
	};

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

	<LineGraph stepped {metrics} {xMin} {xMax} yMin={0} onNavigated={selectDate} />

	<div class="selector">
		<select bind:value={selectedDate} onchange={() => trackTimeTravel('Dropdown')}>
			{#each possibleDates as date}
				<option value={date}>{formatDateString(date)}</option>
			{/each}
		</select>
	</div>

	{#if !limitations.length}
		<p>No cards were banned or restricted at this time.</p>
	{/if}

	{#each limitations as limitation}
		<h3>{limitation.status} ({limitation.cards.length})</h3>
		<CardList cards={limitation.cards} classified />
	{/each}
{/key}
