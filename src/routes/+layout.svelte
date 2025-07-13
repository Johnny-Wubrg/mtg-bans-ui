<script lang="ts">
	import '../style/main.scss';
	import AppHeader from '../components/layout/AppHeader.svelte';
	import AppFooter from '../components/layout/AppFooter.svelte';
	import SiteMeta from '../components/layout/SiteMeta.svelte';
	import ImagePreview from '../components/global/ImagePreview.svelte';
	import { getMaintenance } from '$lib/utils/maintenance';
	import Notice from '../components/layout/Notice.svelte';
	import MaintenanceMessage from '../components/layout/MaintenanceMessage.svelte';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let { children, data } = $props();

	const mainMenu = data.mainMenu;

	const maintenance = $derived($page.url && getMaintenance());
</script>

<svelte:head><SiteMeta /></svelte:head>

<div class="app">
	<AppHeader menu={mainMenu} />

	{#if browser 
		&& (maintenance.status === 'scheduled' 
		|| (maintenance.status === 'active' && $page.data.maintenanceExempt))}
		<Notice>
			{maintenance.message}
		</Notice>
	{/if}

	<main class="container">
		{#if maintenance.status === 'active' && !$page.data.maintenanceExempt}
			<MaintenanceMessage />
		{:else}
			{@render children()}
		{/if}
	</main>

	<AppFooter />

	<ImagePreview />
</div>

<style>
</style>
