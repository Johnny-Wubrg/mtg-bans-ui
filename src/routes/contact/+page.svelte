<script lang="ts">
	interface ReasonDefinition {
		label: string;
	}

	const reasons: Record<string, ReasonDefinition> = {
		general: { label: 'General Inquiry' },
		correction: { label: 'Submit a Correction or Citation' },
		bug: { label: 'Report a Bug' },
	};
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<h1>Contact</h1>

<form name="mtg-bans-contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
	<input type="hidden" name="form-name" value="mtg-bans-contact" />

	<div class="field">
		<label for="contact-subject">Subject</label>
		<select name="subject" id="contact-subject">
			{#each Object.entries(reasons) as [id, reason]}
				<option value={id}>{reason.label}</option>
			{/each}
		</select>
	</div>

	<div class="field">
		<label for="contact-name">Name</label>
		<input id="contact-name" name="contact-name" type="text" />
	</div>

	<div class="field">
		<label for="contact-email">Email</label>
		<input id="contact-email" name="contact-email" type="email" />
	</div>

	<div class="field">
		<label for="comments">Comments</label>
		<textarea id="comments"></textarea>
	</div>
</form>

<style>
    .field {
        margin: 1em 0;

        label, input, textarea {
            display: block;
        }
    }
</style>