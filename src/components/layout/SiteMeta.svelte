<script lang="ts">
	import { PUBLIC_APP_NAME, PUBLIC_PLAUSIBLE_DOMAIN } from '$env/static/public';

	interface Props {
		description?: string;
	}

	const { description }: Props = $props();

	const defaultDescription = `${PUBLIC_APP_NAME} is a comprehensive archive that chronicles the history of Magic: The Gathering's banned and restricted cards. Explore influential cards across the game's most popular formats.`;
</script>

{#if PUBLIC_PLAUSIBLE_DOMAIN}
	<script
		defer
		data-domain={PUBLIC_PLAUSIBLE_DOMAIN}
		src="https://plausible.io/js/script.js"
	></script>
{/if}

<meta name="description" content={description ?? defaultDescription} />
