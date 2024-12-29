<script lang="ts">
	import Wordmark from './Wordmark.svelte';

	interface Navlink {
		href: string;
		label: string;
	}

	const navlinks: Navlink[] = [
		{ href: '/announcements', label: 'Announcements' },
		{ href: '/banlist', label: 'Bans' },
		{ href: '/unresolved', label: 'Help Wanted' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header>
	<a href="/" class="brand-link">
		<Wordmark />
	</a>
	<nav>
		{#each navlinks as navlink}
			<a href={navlink.href}>{navlink.label}</a>&nbsp;
		{/each}
	</nav>
</header>

<style>
	.brand-link {
      text-decoration: none;
	}
</style>