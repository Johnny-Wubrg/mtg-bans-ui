<script lang="ts">
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
	<nav>
		Main Nav: <a href="/">Home</a>
		{#each navlinks as navlink}
			| <a href={navlink.href}>{navlink.label}</a>&nbsp;
		{/each}
	</nav>
</header>