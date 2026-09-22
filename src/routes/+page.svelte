<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import CardSearch from '../components/cards/CardSearch.svelte';
	import LatestAnnouncementBanner from '../components/announcements/LatestAnnouncementBanner.svelte';
	import PageTitle from '../components/layout/PageTitle.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const latestAnnouncement = $derived(data.latestAnnouncement);
	const mostNotoriousCards = $derived(data.mostNotoriousCards);
</script>

<svelte:head>
	<title>Welcome to {PUBLIC_APP_NAME}</title>
</svelte:head>

{#if latestAnnouncement}
	<LatestAnnouncementBanner announcement={latestAnnouncement} />
{/if}

<section>
	<PageTitle>Hello world!</PageTitle>
	<p>
		You have stumbled upon an ongoing project to document and catalog the entire timeline of banned
		and restricted <b>Magic: the Gathering™</b> cards. Feel free to poke around.
	</p>

	<CardSearch />

	{#if mostNotoriousCards?.length}
		<section class="notoriety">
			<h3>Most Notorious Cards</h3>
			<div class="cards">
				{#each mostNotoriousCards as card}
					<a href={`/cards/${card.scryfallId}`}>
						<img src={card.scryfallImageUri} alt={card.name} />
					</a>
				{/each}
			</div>
			<p>
				<a href="/notoriety">See the full top 100</a> &middot;
				<a href="/notoriety/about">What's this?</a>
			</p>
		</section>
	{/if}

	<div class="current">
		<h3>Other Utilities:</h3>
		<ul>
			<li><a href="/announcements">Announcements Timeline</a></li>
			<li><a href="/banlist">Temporal Banlist</a></li>
		</ul>
	</div>
</section>

<style>
	p {
		text-align: center;
	}

	.current {
		max-width: fit-content;
		margin: auto;

		ul {
			margin: 0;
			padding: 0;
		}
	}

	.notoriety {
		margin: 2em 0 0;
		text-align: center;

		.cards {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
			gap: 1em;
			margin: 1em 0;

			img {
				display: block;
				width: 100%;
				border-radius: 0.5em;
			}

			@media (max-width: 600px) {
				a:nth-child(n + 5) {
					display: none;
				}
			}
		}
	}
</style>
