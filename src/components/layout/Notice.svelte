<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet<[]>;
	}

	const { children }: Props = $props();
</script>

<div class="notice">
	<p>
		<iconify-icon icon="mdi:information" width="100%"></iconify-icon>
		<span class="message">
			{@render children()}
		</span>
	</p>
</div>

<style lang="scss">
	@use '@scissors/breakpoints';
	@use '@scissors/media';

	.notice {
		background: var(--color-gray);
		padding: 0.5em 1em;
    margin: 0 1em;
		border-radius: 0.5em;

		@include media.dark {
			background: var(--color-dark-gray);
		}

		@include breakpoints.large {
			max-width: 1200px;
			margin: auto;
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
