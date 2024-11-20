<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">

	<main>
		{@render children()}
	</main>
	
	<footer>
		<p>
			A <a href="https://www.quangdao.com">Quangdao Nguyen</a> catastrophe. All rights reserved.
		</p>
	</footer>
</div>

<style>
</style>
