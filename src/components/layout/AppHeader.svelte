<script lang="ts">
	import Wordmark from './Wordmark.svelte';

	import { getMaintenance } from '$lib/utils/maintenance';
	import type { MenuLink } from '$lib/utils/menus';
	import AppMenu from './AppMenu.svelte';
	import AppMenuMobile from './AppMenuMobile.svelte';

	const maintenance = getMaintenance();

	interface Props {
		menu: MenuLink[];
	}

	const { menu }: Props = $props();

	let open = $state(false);

	const toggleMenu = () => {
		open = !open;
	};
</script>

<header>
	{#if maintenance.status !== 'active'}
		<button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">☰</button>
		<AppMenuMobile {menu} {open} onNavigated={() => (open = false)} />
	{/if}
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
		gap: 1em;
		padding: 1em;
		text-align: center;
		display: flex;
		align-items: center;
		@include breakpoints.large {
			max-width: 1200px;
			margin: auto;
			padding: 1em 0;
			justify-content: space-between;
		}
	}

	.brand-link {
		display: block;
		text-decoration: none;
		text-align: center;
	}

	.menu-toggle {
		@include breakpoints.large {
			display: none;
		}
	}
</style>
