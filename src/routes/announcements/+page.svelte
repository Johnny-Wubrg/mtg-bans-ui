<script lang="ts">
	import type { Announcement } from '$lib/models/Announcement';
	import type { PageData } from './$types';
	import FormattedDate from '../../components/FormattedDate.svelte';
	import SpecialCredits from '../../components/SpecialCredits.svelte';

	interface Props {
		data: PageData;
	}

	interface Data {
		announcements: Announcement[];
	}

	const { data }: Props = $props();
	const { announcements }: Data = data;
</script>

<h1>MTG "Complete" Banned and Restricted Timeline</h1>

<p>
	This is a timeline of every known update to the baned and restricted list of most officially supported constructed
	Magic the Gathering formats. Sources for the announcements are included, with special thanks to the following sources
	for aggregating a lot of this timeline:
</p>

<SpecialCredits />

<p>
	A lot of the of early history was unclear, with no real sources, so there may be some mistakes, especially on the
	timing. Note that specifically for the Commander format, "Restricted" means "Banned as Commander".
</p>

{#each announcements as announcement}
	<article>
		<h2>{announcement.summary}</h2>
		<p>
			Effective:
			<FormattedDate date={announcement.dateEffective} />
		</p>

		{#if announcement.sources.length}
			<h3>Sources</h3>

			<ul>
				{#each announcement.sources as src}
					<li>
						<a href={src}>{src}</a>
					</li>
				{/each}
			</ul>
		{/if}

		<h3>Changes</h3>

		{#each announcement.changesets as changeset}
			<h4>{changeset.format}</h4>

			<ul>
				{#each changeset.changes as change}
					<li>
						{change.type}
						<ul>
							{#each change.cards as card}
								<li>
									<a href={card.scryfallUri}>{card.name}</a>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		{/each}
	</article>

	<hr>
{/each}
