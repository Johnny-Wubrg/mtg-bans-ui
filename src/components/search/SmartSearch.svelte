<script lang="ts">
	import { goto } from '$app/navigation';
	import { smartSearch } from '$lib/api/smartSearch';
	import type { SmartSearchGroup, SmartSearchItem } from '$lib/models/Search';
	import { trackCustomEvent } from '$lib/utils/tracking';
	import { tick } from 'svelte';

	let query = $state('');
	let groups = $state<SmartSearchGroup[]>([]);
	let toggleState = $state<Record<string, boolean>>({});
	let open = $state(false);
	let loading = $state(false);
	let highlightedIndex = $state(0);
	let container: HTMLDivElement;
	let rowElements = $state<(HTMLElement | undefined)[]>([]);

	let debounceTimer: ReturnType<typeof setTimeout> | undefined;
	let requestId = 0;

	const visibleGroups = $derived(
		groups.map((group) => ({
			...group,
			items:
				group.toggle && !toggleState[group.id]
					? group.items.filter((item) => !item.disabled)
					: group.items
		}))
	);

	const flatItems = $derived(
		visibleGroups.flatMap((group) => group.items.map((item) => ({ item, group })))
	);

	const anyHasMore = $derived(visibleGroups.some((group) => group.hasMore));

	$effect(() => {
		rowElements[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
	});

	const runSearch = async (term: string) => {
		const id = ++requestId;
		loading = true;
		open = true;

		const response = await smartSearch(term);

		if (id !== requestId) return;

		groups = response.groups;
		for (const group of groups) {
			if (group.toggle && !(group.id in toggleState)) {
				toggleState[group.id] = group.toggle.defaultValue ?? true;
			}
		}
		highlightedIndex = 0;
		loading = false;

		await tick();
		for (const group of groups) {
			if (group.items.length) trackCustomEvent(`${group.label} Searched`, { query: term });
		}
	};

	const handleInput = () => {
		clearTimeout(debounceTimer);
		const term = query.trim();

		if (!term) {
			requestId++;
			groups = [];
			open = false;
			loading = false;
			return;
		}

		debounceTimer = setTimeout(() => runSearch(term), 300);
	};

	const goToResult = (entry: { item: SmartSearchItem }) => {
		if (!entry.item.href) return;
		open = false;
		goto(entry.item.href);
	};

	const handleKeydown = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			open = false;
			return;
		}

		if (!open || !flatItems.length) return;

		if (evt.key === 'ArrowDown') {
			evt.preventDefault();
			highlightedIndex = Math.min(highlightedIndex + 1, flatItems.length - 1);
		} else if (evt.key === 'ArrowUp') {
			evt.preventDefault();
			highlightedIndex = Math.max(highlightedIndex - 1, 0);
		} else if (evt.key === 'Enter') {
			evt.preventDefault();
			goToResult(flatItems[highlightedIndex]);
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
			placeholder="Search for a card, format, or date..."
			bind:value={query}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => (open = query.trim().length > 0)}
		/>

		{#if open}
			<ul class="results">
				{#each groups as group (group.id)}
					{#if group.toggle}
						<li class="toggle">
							<label>
								<input
									type="checkbox"
									checked={toggleState[group.id]}
									onchange={(e) => {
										toggleState[group.id] = e.currentTarget.checked;
										highlightedIndex = 0;
									}}
								/>
								{group.toggle.label}
							</label>
						</li>
					{/if}
				{/each}

				{#if loading}
					<li class="message">Searching...</li>
				{:else if !flatItems.length}
					<li class="message">
						No results found. {#if anyHasMore}Narrow your search to see more specific results.{/if}
					</li>
				{:else}
					{#each flatItems as entry, i (entry.group.id + ':' + entry.item.id)}
						<li>
							{#if entry.item.href}
								<a
									href={entry.item.href}
									class="row"
									class:highlighted={i === highlightedIndex}
									bind:this={rowElements[i]}
									onmouseenter={() => (highlightedIndex = i)}
									onclick={() => (open = false)}
								>
									{#if entry.item.imageUri}
										<img src={entry.item.imageUri} alt={entry.item.label} />
									{/if}
									<span class="name">{entry.item.label}</span>
								</a>
							{:else}
								<div
									class="row unknown"
									class:highlighted={i === highlightedIndex}
									bind:this={rowElements[i]}
									onmouseenter={() => (highlightedIndex = i)}
									role="presentation"
								>
									{#if entry.item.imageUri}
										<img src={entry.item.imageUri} alt={entry.item.label} />
									{/if}
									<span class="name">{entry.item.label}</span>
									{#if entry.item.disabledLabel}
										<span class="label">{entry.item.disabledLabel}</span>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
					{#if anyHasMore}
						<li class="message hint">Narrow your search to see more specific results.</li>
					{/if}
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

	input[type='text'] {
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

		&.hint {
			padding: 1em;
			font-size: 0.875em;
			font-style: italic;
		}
	}

	.toggle {
		padding: 0.5em 1em;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.875em;

		label {
			display: flex;
			align-items: center;
			gap: 0.5em;
			cursor: pointer;
		}
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.75em;
		padding: 0.5em 1em;
		color: var(--color-text);
		text-decoration: none;

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
