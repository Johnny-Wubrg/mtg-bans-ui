<script lang="ts">
	import Wordmark from './Wordmark.svelte';

	import { getMaintenance } from '$lib/utils/maintenance';
	import type { MenuLink } from '$lib/utils/menus';

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
		<nav>
			{#each menu as item}
				<a href={item.href} class="nav-link">
					<div class="nav-control">
						{item.label}
					</div>
				</a>&nbsp;
			{/each}
		</nav>
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

	nav {
		display: flex;
		justify-content: center;

		@include breakpoints.large {
			justify-content: start;
		}
	}

	.nav-control {
		padding: 1em;
	}
</style>
