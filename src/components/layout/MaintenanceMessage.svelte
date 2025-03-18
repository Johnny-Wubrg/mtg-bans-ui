<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';


	import PageTitle from './PageTitle.svelte';

</script>

<section>
	<PageTitle>Maintenance</PageTitle>
	<p>
		{PUBLIC_APP_NAME} is currently undergoing routine maintenance. Please check back later.
	</p>
</section>


<style>
  p {
    text-align: center; 
  }
</style>