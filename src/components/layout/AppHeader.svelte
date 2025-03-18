<script lang="ts">
	import Wordmark from './Wordmark.svelte';

	import { getMaintenance } from '$lib/utils/maintenance';

	const maintenance = getMaintenance();

	interface Navlink {
		href: string;
		label: string;
	}

	const navlinks: Navlink[] = [
		{ href: '/banlist', label: 'Banlist' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header>
	<a href="/" class="brand-link">
		<Wordmark />
	</a>
	{#if maintenance.status !== 'active'}
		<nav>
			{#each navlinks as navlink}
				<a href={navlink.href} class="nav-link">
					<div class="nav-control">
						{navlink.label}
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
