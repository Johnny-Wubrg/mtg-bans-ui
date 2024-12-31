<script lang="ts">
	import type { Card, Classification } from '$lib/models/Card';
	import CardLink from './CardLink.svelte';

	interface Props {
		cards: Card[];
		classified?: boolean;
	}

	interface Stuff {
		classification: Classification;
		cards: Card[];
	}

	const { cards, classified = false }: Props = $props();
	const classifiedCards = !classified
		? {}
		: cards.reduce<Record<string, Stuff>>((a, c) => {
				if (!c.classification) return a;

				a[c.classification.displayOrder] = a[c.classification.displayOrder] ?? {
					classification: c.classification,
					cards: []
				};
				a[c.classification.displayOrder].cards.push(c);

				return a;
			}, {});

	const remainingCards = classified ? cards.filter((e) => e.classification == null) : cards;

	const getColumns = (count: number) => (count > 14 ? 3 : 1);
</script>

<ul>
	{#each Object.values(classifiedCards) as { classification, cards }}
		<li class="collapsed">
			<details>
				<summary>{classification.summary} ({cards.length})</summary>
				<ul class="cards" style="--column-count: {getColumns(cards.length)}">
					{#each cards as card}
						<li>
							<CardLink {card} />
						</li>
					{/each}
				</ul>
			</details>
		</li>
	{/each}
</ul>

<ul class="cards" style="--column-count: {getColumns(remainingCards.length)}">
	{#each remainingCards as card}
		<li>
			<CardLink {card} />
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '@scissors/breakpoints';
	.collapsed {
		list-style-type: none;
		margin-left: -0.875em;
		padding-left: 0;
	}

	.cards {
		@include breakpoints.large {
			columns: var(--column-count, 1);
			column-gap: 2em;
		}
	}
</style>
