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
	const classifiedCards = cards.reduce<Record<string, Stuff>>((a, c) => {
		if (!c.classification) return a;

		a[c.classification.id] = a[c.classification.id] ?? {
			classification: c.classification,
			cards: []
		};
		a[c.classification.id].cards.push(c);

		return a;
	}, {});
	const remainingCards = classified ? cards.filter(e => e.classification == null) : cards;
</script>


<ul>
	{#each Object.values(classifiedCards) as {classification, cards}}
		<li class="collapsed">
			<details>
				<summary>{classification.summary} ({cards.length})</summary>
				<ul>
					{#each cards as card}
						<li>
							<CardLink {card} />
						</li>
					{/each}
				</ul>
			</details>
		</li>
	{/each}
	{#each remainingCards as card}
		<li>
			<CardLink {card} />
		</li>
	{/each}
</ul>

<style>
	.collapsed {
      list-style-type: none;
      margin-left: -0.875em;
      padding-left: 0;
	}
</style>