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
	<a href={announcement.sources[0]?.uri}>
		Click here to read the latest B&R announcement, published
		<FormattedDate date={announcement.dateEffective} />.
	</a>

	{#if nextStatus.status === 'imminent'}
		A new announcement is expected to land {formatDaysUntil(nextStatus.daysUntil)}.
	{:else if nextStatus.status === 'scheduled'}
		The next announcement is scheduled for <FormattedDate date={nextStatus.date} />.
	{:else if nextStatus.status === 'overdue'}
		The next announcement was scheduled for <FormattedDate date={nextStatus.date} />.
	{/if}
</p>

<style lang="scss">
	@use '@scissors/media';

	.banner {
		background: var(--color-gray);
		margin: 0 0 1.5em;
		padding: 0.5em 1em;
		border-radius: 0.5em;
		text-align: center;

		@include media.dark {
			background: var(--color-dark-gray);
		}
	}
</style>
