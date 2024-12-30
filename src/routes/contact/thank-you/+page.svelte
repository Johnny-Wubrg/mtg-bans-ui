<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import PageTitle from '../../../components/layout/PageTitle.svelte';
</script>

<svelte:head>
	<title>Contact Us | {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageTitle>Thank you!</PageTitle>

<p>
	Your feedback has been submitted. Thanks for connecting!
</p>

<style>
  p {
    text-align: center;
  }
</style>