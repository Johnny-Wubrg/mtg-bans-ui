<script lang="ts">
	import type { CardLegalityEvent } from '$lib/models/Card';
	import FormattedDate from '../FormattedDate.svelte';

	interface Props {
		events: CardLegalityEvent[];
	}

	const { events }: Props = $props();

	const formats = $derived(
		events.reduce<string[]>(
			(acc, e) => (e.format === null || acc.includes(e.format) ? acc : [...acc, e.format]),
			[]
		)
	);

	let selectedFormat = $state('All');

	const visibleEvents = $derived(
		selectedFormat === 'All'
			? events
			: events.filter((e) => e.format === null || e.format === selectedFormat)
	);
</script>

{#if formats.length > 1}
	<div class="pills">
		<button class:active={selectedFormat === 'All'} onclick={() => (selectedFormat = 'All')}>
			All
		</button>
		{#each formats as format}
			<button class:active={selectedFormat === format} onclick={() => (selectedFormat = format)}>
				{format}
			</button>
		{/each}
	</div>
{/if}

<ul class="timeline">
	{#each visibleEvents as event}
		<li>
			{#if event.format === null}
				<FormattedDate date={event.date} /> - Released
			{:else if event.announcementId}
				<a href="/announcements#announcement_{event.announcementId}">
					<FormattedDate date={event.date} />
				</a> - Status changed to
				<span class={event.color}>{event.status}</span>{selectedFormat === 'All'
					? ` in ${event.format}`
					: ''}
			{:else}
				<FormattedDate date={event.date} /> - Status changed to
				<span class={event.color}>{event.status}</span>{selectedFormat === 'All'
					? ` in ${event.format}`
					: ''}
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '@scissors/breakpoints';
	.pills {
		text-align: center;
		font-size: 0.875em;
		margin-bottom: 1em;

		button {
			display: inline-block;
			border-radius: 999px;
			padding: 0.35em 1em;
			margin: 0.5em;
			background: transparent;
			color: var(--color-text);

			&.active {
				background: var(--color-dark-gray);
				color: var(--color-white);
				border-color: var(--color-dark-gray);
			}
		}

		@include breakpoints.large {
			text-align: left;
		}
	}

	.timeline {
		list-style: none;
		padding: 0;

		li {
			padding: 0.25em 0;
		}

		.red {
			color: var(--mtg-red);
		}

		.yellow {
			color: gold;
		}

		.green {
			color: var(--mtg-green);
		}
	}
</style>
