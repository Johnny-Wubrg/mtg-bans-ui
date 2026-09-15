<script lang="ts">
	import type { PublicationArchive } from '$lib/models/Publication';
	import PageTitle from '../../../../components/layout/PageTitle.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	interface Props {
		data: { publication: PublicationArchive };
	}

	const { data }: Props = $props();
	const { publication } = data;
</script>

<svelte:head>
	<title>{publication.title} | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>{publication.title}</PageTitle>

<p class="notice">
	This is a text-only archive and may not reflect the original post's layout.
	<a href={publication.uri}>View the original post</a>.
</p>

{#if publication.contentHtml}
	<article class="archive">
		{@html publication.contentHtml}
	</article>
{:else}
	<p>An archived copy of this post isn't available yet.</p>
{/if}

<style lang="scss">
	.notice {
		text-align: center;
	}
</style>
