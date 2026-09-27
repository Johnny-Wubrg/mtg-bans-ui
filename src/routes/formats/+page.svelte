<script lang="ts">
	import type { Format } from '$lib/models/Format';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	interface PageData {
		formats: Format[];
	}

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { formats } = data;
</script>

<svelte:head>
	<title>Formats | {PUBLIC_APP_NAME}</title>
</svelte:head>

<h1>Formats</h1>

<ul>
	{#each formats as format}
		<li><a href={`/formats/${format.slug}`}>{format.name}</a></li>
	{/each}
</ul>
