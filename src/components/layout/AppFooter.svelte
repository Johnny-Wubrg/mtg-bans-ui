<script lang="ts">
	import { getMaintenance } from '$lib/utils/maintenance';

	const maintenance = getMaintenance();
</script>

<footer class="container">
	<p>
		A <a href="https://www.quangdao.com">Quangdao Nguyen</a> catastrophe. All rights reserved. |
		<a href="/privacy">Privacy Policy</a>
	</p>

	{#if maintenance.status !== 'active'}
		<p>
			Extra Content:
			<a href="/announcements">Full Announcements Timeline</a> |
			<a href="/unresolved">How You Can Help</a>
		</p>
	{/if}

	<p class="disclaimer">
		<b>Magic: the Gathering</b> is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc.
		Portions of this website are unofficial fan content permitted under the Wizards of the Coast Fan
		Content Policy. This site is not produced by, endorsed by, supported by, or affiliated with Wizards
		of the Coast.
	</p>

	<p class="disclaimer">
		Portions of this site is powered by <b><a href="https://scryfall.com/">Scryfall</a></b>, which
		is not an affiliate of this site.
	</p>
</footer>

<style lang="scss">
	@use '@scissors/breakpoints';

	footer {
		margin: 4em auto 2em;
		text-align: center;

		@include breakpoints.large {
			text-align: left;
		}

		p {
			margin: 0.5em 0;

			&.disclaimer {
				font-size: 0.75em;
				font-style: italic;
			}
		}
	}
</style>
