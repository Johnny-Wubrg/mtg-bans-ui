<script lang="ts">
	let { children } = $props();
</script>

<h1>{@render children()}</h1>

<style lang="scss">
  @use '@scissors/breakpoints';

	h1 {
		font-size: 2em;
		text-align: center;
    line-height: 1.2;
    
    @include breakpoints.large {
      font-size: 3em;
      line-height: 0.675;
      -webkit-text-stroke: 1px var(--color-background);
    }    
	}
</style>
