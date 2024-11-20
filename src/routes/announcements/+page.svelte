<script lang="ts">
	import type { Announcement } from '$lib/models/Announcement';
	import type { PageData } from './$types';
	import FormattedDate from '../../components/FormattedDate.svelte';

	interface Props {
		data: PageData;
	}

	interface Data {
		announcements: Announcement[];
	}

	const { data }: Props = $props();
	const { announcements }: Data = data;
</script>

{#each announcements as announcement}
	<article>
		<h2>{announcement.summary}</h2>
		<p>
			Effective:
			<FormattedDate date={announcement.dateEffective} />
		</p>

		<h3>Sources</h3>

		<ul>
			{#each announcement.sources as src}
				<li>
					<a href={src}>{src}</a>
				</li>
			{/each}
		</ul>

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
