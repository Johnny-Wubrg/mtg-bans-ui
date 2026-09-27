<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet<[]>;
	}

	const { children }: Props = $props();
</script>

<div class="notice">
	<div class="container">
		<p>
			<iconify-icon icon="mdi:information" width="100%"></iconify-icon>
			<span class="message">
				{@render children()}
			</span>
		</p>
	</div>
</div>

<style lang="scss">
	@use '@scissors/breakpoints';
	@use '@scissors/media';

	.notice {
		background: var(--color-gray);
		text-align: center;
		padding: 0.5em 1em;
		margin: 0;
		width: 100%;

		@include media.dark {
			background: var(--color-dark-gray);
		}

		p {
			margin: 0;
		}
	}

	.message {
		vertical-align: middle;
	}

	iconify-icon {
		color: var(--color-foreground);
		vertical-align: middle;
		width: 1.5em;
		margin-right: 0.25em;
	}
</style>
