<div class="wordmark">
	<div class="wordmark-component wordmark-mtg">MTG</div>
	<div class="wordmark-component wordmark-bans">Bans</div>
	<div class="wordmark-component wordmark-dot"></div>
	<div class="wordmark-component wordmark-info">info</div>
</div>

<style lang="scss">
	@use '@scissors/breakpoints';

  .wordmark {
    display: flex;
		align-items: baseline;
    justify-content: center;
    font-family: var(--font-primary);
    font-size: 2.5em;
    font-weight: normal;

    @include breakpoints.large {
      justify-content: start;
    }

    &-component {
      margin: 0;
      display: block;
    }
		
		&-mtg {
      font-weight: bold;
			color: var(--color-text);
		}

    &-dot {
      display: flex;
      margin: 0 0.0675em 0;

      &::before {
        content: "";
        aspect-ratio: 1;
        width: 0.275em;
        border-radius: 50%;
        display: block;
        background: var(--color-copper);
      }
    }
  }
</style>