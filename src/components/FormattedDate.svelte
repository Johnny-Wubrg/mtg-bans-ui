<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	interface Props {
		date: string;
	}

	const { date }: Props = $props();
</script>

<time>{formatDate(date)}</time>
