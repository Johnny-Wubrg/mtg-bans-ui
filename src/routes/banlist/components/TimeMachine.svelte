<script>
	import { formatIsoDate } from '$lib/utils/date';

	const { date, now } = $props();
</script>

<form action="/banlist" method="GET" data-sveltekit-reload>
	<div class="input">
		<input
			type="date"
			name="date"
			value={date}
			min="1993-08-05"
			max={formatIsoDate(now)}
			required
		/>
	</div>
	<div class="controls">
		<button>Time Travel!</button>
		{#if date}
			<a class="button" href="/banlist">Return to Present</a>
		{/if}
	</div>
</form>

<style lang="scss">
	$gap: 0.5em;
	form {
		max-width: 600px;
		margin: auto;
	}
	.input {
		margin-bottom: $gap;

		input {
			display: block;
			width: 100%;
		}
	}

	.controls {
		display: flex;
		gap: $gap;

		button, .button {
			display: block;
			width: 100%;
		}
	}
</style>
