<script lang="ts">
	import PageTitle from '../../components/layout/PageTitle.svelte';
	import { goto } from '$app/navigation';

	interface ReasonDefinition {
		label: string;
	}

	const reasons: Record<string, ReasonDefinition> = {
		general: { label: 'General Inquiry' },
		correction: { label: 'Submit a Correction or Citation' },
		bug: { label: 'Report a Bug' }
	};

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const myForm = event.target as HTMLFormElement;
		const formData = new FormData(myForm);

		try {
			const res = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData as any).toString()
			});

			if (!res.ok) throw new Error(res.statusText);

			await goto('/contact/thank-you');
		} catch (e) {
			alert('There was a problem submitting the form. Please try again later.');
		}
	};

</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<PageTitle>Contact</PageTitle>

<form
	name="mtg-bans-contact"
	action="/contact/thank-you"
	method="POST"
	data-netlify="true"
	netlify-honeypot="bot-field"
	onsubmit={(evt) => handleSubmit(evt)}>
	<input type="hidden" name="form-name" value="mtg-bans-contact" />
	<div class="field">
		<label for="contact-subject">Subject</label>
		<select name="subject" id="contact-subject" required>
			{#each Object.entries(reasons) as [id, reason]}
				<option value={id}>{reason.label}</option>
			{/each}
		</select>
	</div>

	<div class="field">
		<label for="contact-name">Name</label>
		<input id="contact-name" name="contact-name" type="text" required />
	</div>

	<div class="field">
		<label for="contact-email">Email</label>
		<input id="contact-email" name="contact-email" type="email" />
	</div>

	<div class="field">
		<label for="comments">Comments</label>
		<textarea id="comments" required></textarea>
	</div>

	<button>Submit</button>
</form>

<style>
  .field {
    margin: 2em 0;

    label {
      margin-bottom: 0.25em;
    }

    label, select, input, textarea {
      display: block;
      width: 100%;
    }

    option {
      color: var(--color-black);
    }

    textarea {
      resize: vertical;
      min-height: 8em;
    }
  }
</style>