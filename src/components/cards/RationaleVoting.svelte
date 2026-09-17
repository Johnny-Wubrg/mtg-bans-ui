<script lang="ts">
	import {
		isRationaleFeedbackHidden,
		setRationaleFeedbackHidden
	} from '$lib/utils/rationaleFeedback';
	import { onMount } from 'svelte';

	interface Props {
		scryfallId: string;
		voteToken: string;
	}

	const { scryfallId, voteToken }: Props = $props();

	let hidden = $state(false);
	let status = $state<'idle' | 'voted' | 'error'>('idle');

	onMount(() => {
		hidden = isRationaleFeedbackHidden();
	});

	const vote = async (direction: 1 | -1) => {
		const response = await fetch(`/api/cards/${scryfallId}/rationale/vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ direction, voteToken })
		});

		status = response.ok ? 'voted' : 'error';
	};

	const dismiss = () => {
		setRationaleFeedbackHidden(true);
		hidden = true;
	};
</script>

{#if !hidden}
	<p class="voting">
		{#if status === 'voted'}
			Thanks for the feedback!
		{:else}
			{#if status === 'error'}
				Something went wrong submitting your feedback. |
			{/if}
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
