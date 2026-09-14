<script lang="ts">
	import { onMount } from 'svelte';

	const HIDE_KEY = 'mtgbans:hideRationaleVoting';

	interface Props {
		scryfallId: string;
	}

	const { scryfallId }: Props = $props();

	let hidden = $state(false);
	let voted = $state(false);

	onMount(() => {
		hidden = localStorage.getItem(HIDE_KEY) === 'true';
	});

	const vote = (direction: 1 | -1) => {
		voted = true;

		fetch(`/api/cards/${scryfallId}/rationale/vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ direction })
		});
	};

	const dismiss = () => {
		localStorage.setItem(HIDE_KEY, 'true');
		hidden = true;
	};
</script>

{#if !hidden}
	<p class="voting">
		{#if voted}
			Thanks for the feedback!
		{:else}
			Does this look accurate? |
			<button type="button" onclick={() => vote(1)}>Yes</button>
			•
			<button type="button" onclick={() => vote(-1)}>No</button>
			•
			<a href="/contact#correction">Submit a Correction</a>
			•
			<button type="button" onclick={dismiss}>Don't ask me again</button>
		{/if}
	</p>
{/if}

<style lang="scss">
	.voting {
		margin-top: 0.5em;
		font-size: 0.85em;
		opacity: 0.8;
	}

	button {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		font: inherit;
		color: var(--color-link);
		text-decoration: underline;
		cursor: pointer;
	}
</style>
