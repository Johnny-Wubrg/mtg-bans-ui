<script lang="ts">
	let { children } = $props();
</script>

<h1>{@render children()}</h1>

<style lang="scss">
	h1 {
      font-size: 3em;
      line-height: 0.675;
      text-align: center;

    -webkit-text-stroke: 1px var(--color-background);
	}
</style>