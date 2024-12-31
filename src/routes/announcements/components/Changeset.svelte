<script lang="ts">
	import type { AnnouncementFormat } from '$lib/models/Announcement';
	import CardList from '../../../components/cards/CardList.svelte';

	interface Props {
		changeset: AnnouncementFormat;
	}

	const { changeset }: Props = $props();

	const additions = changeset.changes
		.filter((e) => e.type !== 'Unbanned')
		.reduce((agg, { cards }) => agg + cards.length, 0);
	const removals = changeset.changes
		.filter((e) => e.type === 'Unbanned')
		.reduce((agg, { cards }) => agg + cards.length, 0);

	const deltas: string[] = [];

	if (additions > 0) deltas.push(`<span class="delta-plus">+${additions}</span>`);
	if (removals > 0) deltas.push(`<span class="delta-minus">-${removals}</span>`);

	const deltasMessage = deltas.length ? `(${deltas.join(', ')})` : '';
</script>

<h4>{changeset.format} {@html deltasMessage}</h4>

<ul>
	{#each changeset.changes as change}
		<li>
			{change.type} ({change.cards.length})
			<CardList cards={change.cards} />
		</li>
	{/each}
</ul>

<style lang="scss">
	:global(.delta-plus) {
		color: var(--mtg-green);
	}

  :global(.delta-minus) {
		color: var(--mtg-red);
	}
</style>
