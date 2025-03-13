<script lang="ts">
	import type { Announcement } from '$lib/models/Announcement';
	import type { PageData } from './$types';
	import FormattedDate from '../../components/FormattedDate.svelte';
	import SpecialCredits from '../../components/SpecialCredits.svelte';
	import PageTitle from '../../components/layout/PageTitle.svelte';
	import Changeset from './components/Changeset.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	interface Props {
		data: PageData;
	}

	interface Data {
		announcements: Announcement[];
	}

	const { data }: Props = $props();
	const { announcements }: Data = data;
</script>

<svelte:head>
	<title>Announcements Timeline | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>MTG "Complete" Banned and Restricted Timeline</PageTitle>

<p>
	This is a timeline of every known update to the banned and restricted list of most officially
	supported constructed Magic the Gathering formats. Sources for the announcements are included,
	with special thanks to the following sources for aggregating a lot of this timeline:
</p>

<SpecialCredits />

<p>
	Note that specifically for the Commander format:
</p>
<ul>
	<li>Prior to 2015, "Restricted" means "Banned as Commander"</li>
	<li>Starting in 2025, "Restricted" means "On the Game Changers List"</li>
</ul>
<p>
	In all formats, "Unbanned" means removed from the B&R list, regardless of whether it was banned or
	restricted.
</p>

<p>
	Some of the data here may be incomplete. For more details, <a href="/unresolved">click here.</a>
</p>

{#each announcements as announcement}
	<article id={`announcement_${announcement.id}`}>
		<details>
			<summary>
				{announcement.summary} | Effective Date:
				<FormattedDate date={announcement.dateEffective} />
			</summary>

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

			{#if announcement.changesets.length}
				<h3>Changes</h3>

				{#each announcement.changesets as changeset}
					<Changeset {changeset} />
				{/each}
			{/if}

			<p>
				<a class="button" href="/banlist?date={announcement.dateEffective}"
					>Click here to view the historical banlist at the time.</a
				>
			</p>
		</details>
	</article>
{/each}
