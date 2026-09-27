<script lang="ts">
	import type { Announcement } from '$lib/models/Announcement';
	import { formatDaysUntil, getNextAnnouncementStatus } from '$lib/utils/announcements';
	import FormattedDate from '../FormattedDate.svelte';

	interface Props {
		announcement: Announcement;
	}

	const { announcement }: Props = $props();

	const nextStatus = $derived(getNextAnnouncementStatus(announcement.dateNextProjected));
</script>

<p class="banner">
	Latest B&R:
	<a href={announcement.sources[0]?.uri}>
		<FormattedDate date={announcement.dateEffective} />
	</a>

	{#if nextStatus.status === 'imminent'}
		• Next: <FormattedDate date={nextStatus.date} /> ({formatDaysUntil(nextStatus.daysUntil)})
	{:else if nextStatus.status === 'scheduled'}
		• Next: <FormattedDate date={nextStatus.date} />
	{:else if nextStatus.status === 'overdue'}
		• Next: <FormattedDate date={nextStatus.date} /> (Overdue)
	{/if}
</p>

<style lang="scss">
	@use '@scissors/media';

	.banner {
		background: var(--color-gray);
		margin: 0 auto 1.5em;
		padding: 0.5em 1em;
		border-radius: 0.5em;
		text-align: center;
		width: max-content;

		@include media.dark {
			background: var(--color-dark-gray);
		}
	}
</style>
