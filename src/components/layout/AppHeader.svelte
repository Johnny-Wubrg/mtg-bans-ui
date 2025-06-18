<script lang="ts">
	import Wordmark from './Wordmark.svelte';

	import { getMaintenance } from '$lib/utils/maintenance';
	import type { MenuLink } from '$lib/utils/menus';
	import AppMenu from './AppMenu.svelte';

	const maintenance = getMaintenance();

	interface Props {
		menu: MenuLink[];
	}

	const { menu }: Props = $props();
</script>

<header>
	<a href="/" class="brand-link">
		<Wordmark />
	</a>
	{#if maintenance.status !== 'active'}
		<AppMenu {menu} />
	{/if}
</header>

<style lang="scss">
	@use '@scissors/breakpoints';

	header {
		padding: 1em;
		text-align: center;
		@include breakpoints.large {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 1200px;
			margin: auto;
			padding: 1em 0;
		}
	}

	.brand-link {
		display: block;
		text-decoration: none;
		text-align: center;
	}
</style>
