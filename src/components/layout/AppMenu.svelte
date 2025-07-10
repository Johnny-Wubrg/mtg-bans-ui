<script>
	const { menu } = $props();
</script>

<nav class="nav">
	{#each menu as item}
		<div class="nav-item">
			<a href={item.href} class="nav-link">
				<div class="nav-control">
					{item.label}
				</div>
			</a>
			{#if item.children}
				<ul class="nav-children">
					{#each item.children as child}
						<li class="nav-child">
							<a class="nav-child-link" href={child.href}>
								{child.label}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</nav>

<style lang="scss">
	@use '@scissors/breakpoints';

	.nav {
		display: flex;
		justify-content: center;

		@include breakpoints.large {
			justify-content: start;
		}

		&-item {
			position: relative;
			&:hover {
				.nav-children {
					display: block;
				}
			}
		}

		&-control {
			padding: 1em;
		}

		&-children {
			margin: 0;
			display: none;
			position: absolute;
			top: 100%;
		}

		&-child {
			background: var(--color-dark-gray);
			text-align: left;
			list-style-type: none;
      &-link {
				color: var(--color-white);
				display: block;
        line-height: 1;
        padding: 0.75em 1em;
      }
		}
	}
</style>
