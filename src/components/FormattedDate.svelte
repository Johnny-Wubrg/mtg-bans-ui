<script lang="ts">
	interface Props {
		date: string;
	}

	const { date } = $props();

	const parsedDate = new Date(date);
	const convertedDate = new Date(parsedDate.setMinutes(
		parsedDate.getMinutes() + parsedDate.getTimezoneOffset()
	));
	const formattedDate = convertedDate.toLocaleDateString();
</script>

<time>{formattedDate}</time>
