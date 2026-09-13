<script lang="ts">
	import { goto } from '$app/navigation';
	import { searchCards } from '$lib/api/search';
	import type { CardSearchResult } from '$lib/models/Search';
	import { trackCustomEvent } from '$lib/utils/tracking';
	import { tick } from 'svelte';

	let query = $state('');
	let results = $state<CardSearchResult[]>([]);
	let open = $state(false);
	let loading = $state(false);
	let highlightedIndex = $state(0);
	let container: HTMLDivElement;
	let rowElements = $state<(HTMLElement | undefined)[]>([]);

	let debounceTimer: ReturnType<typeof setTimeout> | undefined;
	let requestId = 0;

	$effect(() => {
		rowElements[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
	});

	const runSearch = async (term: string) => {
		const id = ++requestId;
		loading = true;
		open = true;

		const searchResults = await searchCards(term);

		if (id !== requestId) return;

		results = searchResults;
		highlightedIndex = 0;
		loading = false;

		await tick();
		trackCustomEvent('Card Searched', { query: term });
	};

	const handleInput = () => {
		clearTimeout(debounceTimer);
		const term = query.trim();

		if (!term) {
			requestId++;
			results = [];
			open = false;
			loading = false;
			return;
		}

		debounceTimer = setTimeout(() => runSearch(term), 300);
	};

	const goToResult = (result: CardSearchResult) => {
		if (!result.known) return;
		open = false;
		goto(`/cards/${result.scryfallId}`);
	};

	const handleKeydown = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			open = false;
			return;
		}

		if (!open || !results.length) return;

		if (evt.key === 'ArrowDown') {
			evt.preventDefault();
			highlightedIndex = Math.min(highlightedIndex + 1, results.length - 1);
		} else if (evt.key === 'ArrowUp') {
			evt.preventDefault();
			highlightedIndex = Math.max(highlightedIndex - 1, 0);
		} else if (evt.key === 'Enter') {
			evt.preventDefault();
			goToResult(results[highlightedIndex]);
		}
	};

	const handleWindowClick = (evt: MouseEvent) => {
		if (!container.contains(evt.target as Node)) open = false;
	};
</script>

<svelte:window onclick={handleWindowClick} />

<div class="search" bind:this={container}>
	<div class="search-container">
		<input
			type="text"
			placeholder="Search for a card..."
			bind:value={query}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => (open = query.trim().length > 0)}
		/>

		{#if open}
			<ul class="results">
				{#if loading}
					<li class="message">Searching...</li>
				{:else if !results.length}
					<li class="message">No cards found.</li>
				{:else}
					{#each results as result, i (result.scryfallId)}
						<li>
							{#if result.known}
								<a
									href={`/cards/${result.scryfallId}`}
									class="row"
									class:highlighted={i === highlightedIndex}
									bind:this={rowElements[i]}
									onmouseenter={() => (highlightedIndex = i)}
									onclick={() => (open = false)}
								>
									<img src={result.scryfallImageUri} alt={result.name} />
									<span class="name">{result.name}</span>
								</a>
							{:else}
								<div
									class="row unknown"
									class:highlighted={i === highlightedIndex}
									bind:this={rowElements[i]}
									onmouseenter={() => (highlightedIndex = i)}
									role="presentation"
								>
									<img src={result.scryfallImageUri} alt={result.name} />
									<span class="name">{result.name}</span>
									<span class="label">No banning records</span>
								</div>
							{/if}
						</li>
					{/each}
				{/if}
			</ul>
		{/if}
	</div>

	<p class="footnote">
		Search is powered by <a href="https://scryfall.com/">Scryfall</a>.
		<a href="https://scryfall.com/docs/syntax">Search syntax</a> is supported.
	</p>
</div>

<style lang="scss">
	@use '@scissors/media';

	.search {
		max-width: 30em;
		margin: 0 auto 2em;
		&-container {
			position: relative;
		}
		.footnote {
			margin: 0;
			font-size: 0.75em;
			text-align: right;
			font-style: italic;
		}
	}

	input {
		width: 100%;
	}

	.results {
		position: absolute;
		z-index: 1;
		top: calc(100% + 0.25em);
		left: 0;
		right: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		background: var(--color-background);
		border: 2px solid var(--color-border);
		max-height: 20em;
		overflow-y: auto;
	}

	.message {
		padding: 0.5em 1em;
		color: var(--color-text);
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.75em;
		padding: 0.5em 1em;
		color: var(--color-text);
		text-decoration: none;

		&:hover,
		&.highlighted {
			background: var(--color-border);

			@include media.dark {
				background: var(--color-dark-gray);
			}
		}

		img {
			width: 2.5em;
			border-radius: 0.25em;
			flex-shrink: 0;
			aspect-ratio: 5 / 7;
		}

		.name {
			flex: 1 0 0;
		}
	}

	.unknown {
		.name {
			color: var(--mtg-black);
		}

		.label {
			text-align: right;
			font-size: 0.75em;
			color: var(--mtg-black);
		}
	}
</style>
