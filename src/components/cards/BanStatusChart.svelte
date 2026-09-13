<script lang="ts">
	import type { CardFormatStatus } from '$lib/models/Card';
	import FormattedDate from '../FormattedDate.svelte';

	interface Props {
		statuses: CardFormatStatus[];
	}

	const { statuses }: Props = $props();
</script>

<table class="ban-status">
	<tbody>
		{#each statuses as status}
			<tr>
				<th>{status.format}</th>
				<td>
					{#if status.type === 'Limitation'}
						<span class={status.color}>{status.status}</span> since <FormattedDate
							date={status.date!}
						/>
					{:else if status.type === 'Rotated'}
						Rotated since <FormattedDate date={status.date!} />
					{:else if status.type === 'Unbanned'}
						Unbanned since <FormattedDate date={status.date!} />
					{:else if status.type === 'NotLegal'}
						Not Legal
					{:else if status.format === 'Pauper'}
						<abbr
							title="We don't track individual card legalities for Pauper; this card may have never been legal due to format restrictions."
						>
							Never Banned
						</abbr>
					{:else}
						Never Banned
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	.ban-status {
		border-collapse: collapse;

		th {
			text-align: left;
			font-weight: normal;
			padding: 0.25em 1em 0.25em 0;
		}

		td {
			padding: 0.25em 0;
		}

		.red {
			color: var(--mtg-red);
		}

		.yellow {
			color: gold;
		}

		.green {
			color: var(--mtg-green);
		}
	}
</style>
