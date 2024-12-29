<script lang="ts">
	import '../style/main.scss';
	import AppHeader from '../components/layout/AppHeader.svelte';
	import AppFooter from '../components/layout/AppFooter.svelte';

	let { children } = $props();
</script>

<div class="app">
	<AppHeader />

	<main>
		{@render children()}
	</main>

	<AppFooter />
</div>

<style>
</style>
