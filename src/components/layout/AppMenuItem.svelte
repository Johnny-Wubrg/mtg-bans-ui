<script lang="ts">
	import type { MenuLink } from '$lib/utils/menus';
	import { slide } from 'svelte/transition';

	interface Props {
		item: MenuLink;
		mobile: boolean;
		onNavigated?: () => void;
	}

	const { item, mobile = true, onNavigated }: Props = $props();

	let open = $state(!mobile);

	const toggleMenu = (evt: TouchEvent) => {
		evt.preventDefault();
		open = !open;
	};

	const navigate = () => {
		open = false;
		onNavigated?.();
	};
</script>

<div class="nav-item">
	<a href={item.href} class="nav-link" class:nav-parent={item.children?.length}>
		<div class="nav-control">
			{item.label}
		</div>
		{#if item.children}
			<button class="nav-toggle" ontouchend={toggleMenu}>▼</button>
		{/if}
	</a>
	{#if item.children && (!mobile || open)}
		<ul class="nav-children" class:open transition:slide>
			{#each item.children as child}
				<li class="nav-child">
					<a class="nav-child-link" href={child.href} onclick={navigate}>
						{child.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	@use '@scissors/breakpoints';

	.nav {
		&-item {
			position: relative;
			@include breakpoints.large {
				&:hover {
					.nav-children {
						display: block;
					}
				}
			}
		}

		&-link {
			display: flex;
			width: 100%;
			text-decoration: none;
			@include breakpoints.large {
				display: block;
				width: auto;
			}
		}
		&-control {
			padding: 1em;
			flex: 1 1 auto;
		}

		&-toggle {
			flex: 0 0 auto;
			@include breakpoints.large {
				display: none;
			}
		}

		&-children {
			margin: 0;
			padding: 0;
			display: none;
			@include breakpoints.large {
				position: absolute;
				top: 100%;
			}
			&.open {
				display: block;
			}
		}

		&-child {
			background: var(--color-dark-gray);
			text-align: left;
			list-style-type: none;
			&-link {
				color: var(--color-white);
				text-decoration: none;
				display: block;
				line-height: 1;
				padding: 1em;
				@include breakpoints.large {
					padding: 0.75em 1em;
				}
			}
		}
	}
</style>
