<script lang="ts">
	import '../style/main.scss';
	import AppHeader from '../components/layout/AppHeader.svelte';
	import AppFooter from '../components/layout/AppFooter.svelte';
	import { dev } from '$app/environment';

	let { children } = $props();
</script>

<svelte:head>
	{#if !dev}
		<script defer data-domain="mtgbans.info" src="https://plausible.io/js/script.js"></script>
	{/if}
</svelte:head>

<div class="app">
	<AppHeader />

	<main class="container">
		{@render children()}
	</main>

	<AppFooter />
</div>

<style>
</style>
