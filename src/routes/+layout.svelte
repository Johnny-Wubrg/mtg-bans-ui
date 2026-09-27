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
	const homepage = $derived($page.data.homepage && maintenance.status !== 'active');
</script>

<svelte:head><SiteMeta /></svelte:head>

<div class="app">
	{#if browser && (maintenance.status === 'scheduled' || (maintenance.status === 'active' && $page.data.maintenanceExempt))}
		<Notice>
			{maintenance.message}
		</Notice>
	{/if}

	{#if !homepage}
		<AppHeader menu={mainMenu} />
	{/if}

	{#if homepage}
		{@render children()}
	{:else}
		<main class="container">
			{#if maintenance.status === 'active' && !$page.data.maintenanceExempt}
				<MaintenanceMessage />
			{:else}
				{@render children()}
			{/if}
		</main>
	{/if}

	<AppFooter />

	<ImagePreview />
</div>

<style>
</style>
