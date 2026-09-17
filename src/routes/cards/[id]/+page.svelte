<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { trackCustomEvent } from '$lib/utils/tracking';
	import BanStatusChart from '../../../components/cards/BanStatusChart.svelte';
	import CardRationale from '../../../components/cards/CardRationale.svelte';
	import LegalityTimeline from '../../../components/cards/LegalityTimeline.svelte';
	import PageTitle from '../../../components/layout/PageTitle.svelte';

	interface PageData {
		card: Card;
		voteToken: string | null;
	}

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { card, voteToken } = data;

	const trackVisit = () => trackCustomEvent('Scryfall Visit', { card: card.name });
</script>

<PageTitle>{card.name}</PageTitle>

<div class="intro">
	<div class="card">
		<img src={card.scryfallImageUri} alt={card.name} />
	</div>
	{#if card.formatStatuses}
		<div class="statuses">
			<BanStatusChart statuses={card.formatStatuses} />
			<p>
				<a
					class="button"
					href={card.scryfallUri}
					onmousedown={trackVisit}
					ontouchstart={trackVisit}
				>
					View on Scryfall
				</a>
			</p>
		</div>
	{/if}
</div>

{#if card.legalityEvents?.length}
	<h2>Timeline</h2>
	<LegalityTimeline events={card.legalityEvents} />
{/if}

{#if card.rationale}
	<h2>Rationale</h2>
	<CardRationale scryfallId={card.scryfallId} rationale={card.rationale} {voteToken} />
{/if}

<style lang="scss">
	@use '@scissors/breakpoints';

	.intro {
		@include breakpoints.large {
			margin: 4em 0 2em;
			display: flex;
			gap: 3em;
			justify-content: center;
			align-items: center;
		}
	}

	.card {
		text-align: center;
		@include breakpoints.large {
			flex: 0 0 30%;
		}
		img {
			display: block;
			width: 100%;
			max-width: 20em;
			margin: auto;
			border-radius: 1em;
		}
	}

	.statuses {
		text-align: center;
		h2 {
			margin-top: 0;
		}
		@include breakpoints.large {
			text-align: left;
			flex: 0 0 auto;
		}
	}
</style>
