<script>
	import { dev } from '$app/environment';
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

{#if !dev}
	<script defer data-domain="mtgbans.info" src="https://plausible.io/js/script.js"></script>
{/if}

<meta
	name="description"
	content="{PUBLIC_APP_NAME} is a comprehensive archive that chronicles the history of Magic: The Gathering's banned and restricted cards. Explore influential cards across the game's most popular formats."
/>
