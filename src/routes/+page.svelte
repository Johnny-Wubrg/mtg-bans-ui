<script lang="ts">
import SpecialCredits from '../components/SpecialCredits.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Hello world!</h1>
	<p>
		You have stumbled upon an ongoing project to document, catalog, and eventually visualize the entire timeline of
		banned and restricted <b>Magic: the Gathering™</b> cards. For now, all we have is <a href="/announcements">part of
		the timeline</a>.
	</p>

	<h3>Special Thanks</h3>
	<SpecialCredits />
</section>

<style>
</style>
