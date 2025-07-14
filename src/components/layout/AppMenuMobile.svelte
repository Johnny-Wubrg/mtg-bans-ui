<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { MenuLink } from '$lib/utils/menus';
	import AppMenuItem from './AppMenuItem.svelte';
	interface Props {
		menu: MenuLink[];
		open: boolean;
		onNavigated?: () => void;
	}
	const { menu, open, onNavigated }: Props = $props();
</script>

{#if open}
	<div
		class="nav-overlay"
		onclick={onNavigated}
		role="presentation"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100, delay: 200 }}
	>
		<nav
			class="nav"
			in:fly={{ x: -120, delay: 100, duration: 200 }}
			out:fly={{ x: -120, duration: 200 }}
		>
			<button class="nav-close" aria-label="Close Navigation" onclick={onNavigated}>
				&times;
			</button>
			{#each menu as item}
				<AppMenuItem mobile {item} {onNavigated} />
			{/each}
		</nav>
	</div>
{/if}

<style lang="scss">
	@use '@scissors/breakpoints';
	.nav {
		justify-content: center;
		position: absolute;
		background: var(--color-background);
		top: 0;
		left: 0;
		bottom: 0;
		right: 30%;
		text-align: left;
		&-close {
			width: 100%;
			background-color: var(--mtg-red);
		}
		&-overlay {
			width: 100%;
			background: rgba(#000, 0.7);
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			@include breakpoints.large {
				display: contents;
			}
		}
		@include breakpoints.large {
			display: none;
		}
	}
</style>
