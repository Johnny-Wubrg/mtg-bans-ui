<script lang="ts">
	import type { Format, FormatDetail } from '$lib/models/Format';
	import FormattedDate from '../../../components/FormattedDate.svelte';

  interface PageData {
    format: FormatDetail
  }

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { format } = data;
</script>

<h1>{format.name}</h1>

<h2>Timeline</h2>

<ul>
  {#each format.events as evt}
    <li><FormattedDate date={evt.dateEffective} /> &mdash; {evt.description}</li>
  {/each}
</ul>