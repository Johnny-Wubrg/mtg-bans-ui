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
						Rotated out on <FormattedDate date={status.date!} />
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
	@use '@scissors/breakpoints';

	.ban-status {
		border-collapse: collapse;
		display: block;
		margin: 1em 0;

		tbody,
		tr,
		th,
		td {
			display: block;
		}

		tr {
			width: 100%;
			margin-bottom: 1em;
		}

		th {
			font-weight: bold;
		}

		td {
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

		@include breakpoints.large {
			display: table;

			tbody {
				display: table-row-group;
			}

			tr {
				display: table-row;
				margin-bottom: 0;
			}

			td {
				display: table-cell;
				padding: 0.25em 0;
			}

			th {
				display: table-cell;
				text-align: left;
				padding: 0.25em 1em 0.25em 0;
			}
		}
	}
</style>
