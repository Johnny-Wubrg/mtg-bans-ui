<script lang="ts">
	import '../style/main.scss';
	import AppHeader from '../components/layout/AppHeader.svelte';
	import AppFooter from '../components/layout/AppFooter.svelte';
	import SiteMeta from '../components/layout/SiteMeta.svelte';
	import ImagePreview from '../components/global/ImagePreview.svelte';

	let { children } = $props();
</script>

<svelte:head><SiteMeta /></svelte:head>

<div class="app">
	<AppHeader />

	<main class="container">
		{@render children()}
	</main>

	<AppFooter />

	<ImagePreview />
</div>

<style>
</style>
