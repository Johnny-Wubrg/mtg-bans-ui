<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import SmartSearch from '$components/search/SmartSearch.svelte';
	import CardImageLink from '$components/cards/CardImageLink.svelte';
	import LatestAnnouncementBanner from '$components/announcements/LatestAnnouncementBanner.svelte';
	import type { PageData } from './$types';
	import Wordmark from '$components/layout/Wordmark.svelte';
	import AppMenu from '$components/layout/AppMenu.svelte';

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

<section class="home">
	<div class="content">
		{#if latestAnnouncement}
			<div class="container">
				<LatestAnnouncementBanner announcement={latestAnnouncement} />
			</div>
		{/if}

		<div class="container">
			<div class="hero">
				<Wordmark />
				<div class="tagline">
					<h2>30+ Years of Wizards Saying <span class="emphasis">NO</span>.</h2>
				</div>
			</div>

			<SmartSearch />

			<div class="home-nav">
				<div class="home-nav-link"><a href="/banlist">Current Banlist</a></div>
				<div class="home-nav-link"><a href="/announcements">All Announcements</a></div>
			</div>
		</div>

		{#if mostNotoriousCards?.length}
			<div class="container">
				<section class="notoriety">
					<h3>Most Notorious Cards</h3>
					<div class="cards">
						{#each mostNotoriousCards as card}
							<CardImageLink {card} />
						{/each}
					</div>
					<p>
						<a href="/notoriety">See the full top 100</a> &middot;
						<a href="/notoriety/about">What's this?</a>
					</p>
				</section>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	@use '@scissors/breakpoints';

	.home {
		position: relative;
		background-image: url(/images/time-vault-art-crop.jpg);
		background-color: var(--color-background);
		background-size: cover;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to bottom,
				color-mix(in srgb, var(--color-background) 85%, transparent) 0%,
				color-mix(in srgb, var(--color-background) 85%, transparent) 70%,
				var(--color-background) 100%
			);
			pointer-events: none;
			backdrop-filter: blur(8px);
		}
	}

	.content {
		position: relative;
		padding: 1em 0;
		@include breakpoints.large {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: stretch;
		}
	}

	p {
		text-align: center;
	}

	.hero {
		text-align: center;
		margin-top: 4em;
		:global(.wordmark) {
			margin: auto;
			font-size: 2.5em;
		}
		:global(.wordmark-component) {
			line-height: 1;
		}

		.tagline {
			font-style: italic;
			font-size: 0.75em;
			h2 {
				margin: 0 0 0.5em;
			}
			.emphasis {
				color: var(--color-copper);
			}
		}
		@include breakpoints.large {
			margin: 0;
			:global(.wordmark) {
				font-size: 6em;
			}
			.tagline {
				font-size: 1.75em;
			}
		}
	}

	.home-nav {
		font-size: 1.25em;
		text-align: center;
		&-link {
			display: block;
			a {
				text-decoration: none;
				font-weight: bold;
				&:hover {
					text-decoration: underline;
				}
			}
		}
		@include breakpoints.large {
			display: flex;
			justify-content: center;
			&-link {
				&:not(:last-child)::after {
					content: '•';
					display: inline-block;
					margin: 0 0.75em;
				}
			}
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

			@media (max-width: 600px) {
				:global(a:nth-child(n + 5)) {
					display: none;
				}
			}
		}
	}
</style>
