<script lang="ts">
	import type { Card } from '$lib/models/Card';
	import { trackCustomEvent } from '$lib/utils/tracking';
	import PageTitle from '../../../components/layout/PageTitle.svelte';

	interface PageData {
		card: Card;
	}

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { card } = data;

	const trackVisit = () => trackCustomEvent('Scryfall Visit', { card: card.name });
</script>

<PageTitle>{card.name}</PageTitle>

<div class="intro">
	<div class="card">
		<img src={card.scryfallImageUri} alt={card.name} />
	</div>

	<p>
		<a href={card.scryfallUri} onmousedown={trackVisit} ontouchstart={trackVisit}>
			View on Scryfall
		</a>
	</p>
</div>

<style lang="scss">
  .intro {
    text-align: center;
  }

  .card {
    max-width: 20em;
    margin: auto;
    img {
      display: block;
      width: 100%;
      border-radius: 1em;
    }
  }
</style>
