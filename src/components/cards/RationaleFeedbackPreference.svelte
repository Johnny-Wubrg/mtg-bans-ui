<script lang="ts">
	import {
		isRationaleFeedbackHidden,
		setRationaleFeedbackHidden
	} from '$lib/utils/rationaleFeedback';
	import { onMount } from 'svelte';

	let hidden = $state(false);
	let restored = $state(false);

	onMount(() => {
		hidden = isRationaleFeedbackHidden();
	});

	const restore = () => {
		setRationaleFeedbackHidden(false);
		hidden = false;
		restored = true;
	};
</script>

{#if hidden}
	<p class="notice">
		<b>You've turned off rationale feedback prompts on this device.</b>
	</p>
	<button type="button" onclick={restore}>I Change My Mind</button>
{:else if restored}
	<p class="notice">Feedback prompts are back on for this device.</p>
{/if}
