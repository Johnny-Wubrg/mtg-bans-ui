<script lang="ts">
	import Wordmark from './Wordmark.svelte';

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
	<nav>
		{#each navlinks as navlink}
			<a href={navlink.href} class="nav-link">
				<div class="nav-control">
					{navlink.label}
				</div>
			</a>&nbsp;
		{/each}
	</nav>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1200px;
        margin: auto;
        padding: 1em 0;
    }

    .brand-link {
        display: block;
        text-decoration: none;
    }
		
		nav {
        display: flex;
		}
		
		.nav-control {
        padding: 1em;
		}
</style>