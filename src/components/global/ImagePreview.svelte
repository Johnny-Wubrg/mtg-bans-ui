<script lang="ts">
	import { trackCustomEvent } from '$lib/utils/tracking';

	let src = $state('');

	let previewX: number = $state(-500);
	let previewY: number = $state(-500);
	let ratio = $state(1);

	const width = 220;
	const height = $derived(220 * ratio);
	const offset = 15;

	let lastPreview = '';
	let trackingDebouncer: number | null | undefined = null;
	const trackPreview = (card: string) => {
		if (!card) return;
		if (lastPreview == card) return;
		lastPreview = card;

		if (trackingDebouncer) clearTimeout(trackingDebouncer);

		trackingDebouncer = setTimeout(() => {
			trackCustomEvent('Scryfall Preview', { card });
		}, 200);
	};

	const handleMouseMove = (evt: MouseEvent) => {
		const target = evt.target as HTMLElement;
		const bufferX = window.scrollX + window.innerWidth;
		const bufferY = window.scrollY + window.innerHeight;
		const projectedX = evt.pageX + offset;
		const projectedY = evt.pageY + offset;

		previewX = projectedX + width < bufferX ? projectedX : evt.pageX - width - offset;
		previewY = projectedY + height < bufferY ? projectedY : evt.pageY - height - offset;

		if (!target.dataset.imagePreview) {
			src = '';
			lastPreview = '';
      if (trackingDebouncer) clearTimeout(trackingDebouncer);
			return;
		}

		src = target.dataset.imagePreview;
		ratio = target.dataset.imageRatio ? parseFloat(target.dataset.imageRatio) : 2;

		if (src.includes('cards.scryfall.io')) trackPreview(target.textContent?.trim() ?? '');
	};

	const resetImage = () => (src = '');
</script>

<svelte:window onmousemove={handleMouseMove} onblur={resetImage} onresize={resetImage} />

<div class="preview" style={`--pos-x: ${previewX}px;--pos-y: ${previewY}px;--width:${width}px`}>
	{#if src}
		<img {src} alt="" />
	{/if}
</div>

<style lang="scss">
	.preview {
		position: absolute;
		top: var(--pos-y);
		left: var(--pos-x);
		img {
			display: block;
			width: var(--width);
		}
	}
</style>
