<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import CardSearch from '../components/cards/CardSearch.svelte';
	import PageTitle from '../components/layout/PageTitle.svelte';
</script>

<svelte:head>
	<title>Welcome to {PUBLIC_APP_NAME}</title>
</svelte:head>

<section>
	<PageTitle>Hello world!</PageTitle>
	<p>
		You have stumbled upon an ongoing project to document and catalog the entire timeline of banned
		and restricted <b>Magic: the Gathering™</b> cards. Feel free to poke around.
	</p>

	<CardSearch />

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
</style>
