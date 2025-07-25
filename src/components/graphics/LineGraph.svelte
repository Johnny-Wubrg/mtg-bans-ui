<script lang="ts" generics="TValue, TX  extends GraphDataPoint, TY extends GraphDataPoint">
	import type { ComputedNode, GraphDataPoint, GraphSettings } from '$lib/models/Graphics';
	import { convertDate, formatIsoDate } from '$lib/utils/date';
	import { getGraphData } from '$lib/utils/graphics';

	interface Props extends GraphSettings<TValue, TX, TY> {
		stepped?: boolean;
		onNavigated?: (val: TX) => void;
	}

	const props: Props = $props();

	const { metrics, stepped = false, onNavigated: onnodeclicked } = props;

	const padding = 8;

	const yLabelWidth = 20;

	const xLabelHeight = 60;

	const graphWidth = 1000;
	const graphHeight = 200;
	const graphX = yLabelWidth + padding;
	const graphY = 0 + padding;
	const graphRight = graphX + graphWidth;
	const graphBottom = graphY + graphHeight;

	const viewBoxWidth = graphWidth + yLabelWidth + 2 * padding;
	const viewBoxHeight = graphHeight + xLabelHeight + 2 * padding;

	let visibleMetrics = $state(metrics.map((m) => m.label));
	let metricsToShow = $derived(metrics.filter((m) => visibleMetrics.includes(m.label)));
	let graphicElement: SVGElement;
	let selectable: TX | null = $state(null);

	const { lines, x, y } = $derived(getGraphData({ ...props, metrics: metricsToShow }));

	const getGraphX = (magnitude: number) => graphX + graphWidth * magnitude;
	const getGraphY = (magnitude: number) => graphBottom - graphHeight * magnitude;

	const marker = $state({
		visible: true,
		x: graphX,
		label: '',
		offset: false
	});

	const isMouseEvent = (evt: PointerEvent) =>
		evt.pointerType === 'mouse' || (evt.pointerType === undefined && evt.type.startsWith('mouse'));

	const handleMouseMove = (evt: PointerEvent) => {
		if (!isMouseEvent(evt)) return true;
		const { clientX, clientY } = evt;
		const rect = graphicElement.getBoundingClientRect();
		const effectiveX = ((clientX - rect.left) / rect.width) * viewBoxWidth;
		const effectiveY = ((clientY - rect.top) / rect.height) * viewBoxHeight;

		selectable = null;

		if (
			effectiveX < graphX ||
			effectiveX > graphRight ||
			effectiveY < graphY ||
			effectiveY > graphBottom
		) {
			marker.visible = false;
			marker.label = '';
			return true;
		}

		marker.visible = true;

		const proportion = (effectiveX - graphX) / graphWidth;
		const effectiveValue = x.points.diff * proportion + x.points.min;
		const closest = x.values
			.keys()
			.toArray()
			.toSorted((b, a) => Math.abs(b - effectiveValue) - Math.abs(a - effectiveValue))[0];

		const closestProportion = (closest - x.points.min) / x.points.diff;
		let target = proportion;
		let value = effectiveValue;

		if (closest && Math.abs(closestProportion - proportion) < 0.01) {
			target = closestProportion;
			value = closest;
			selectable = (x.isDate ? new Date(closest) : closest) as TX;
		}

		marker.x = getGraphX(target);
		marker.label = x.isDate
			? convertDate(new Date(value)).toLocaleDateString()
			: effectiveValue.toLocaleString();
		marker.offset = target > 0.5;
	};

	const handleClick = (evt: PointerEvent) => {
		if (!isMouseEvent(evt) || selectable === null) return true;
		onnodeclicked?.(selectable);
	};

	const createPath = (nodes: ComputedNode<TValue>[]) => {
		let instructions = [];
		if (nodes[0].x > 0) instructions.push(`${getGraphX(nodes[0].x)} ${graphBottom}`);
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const next = {
				x: i >= nodes.length - 1 ? graphRight : getGraphX(nodes[i + 1].x),
				y: getGraphY(node.y)
			};

			instructions.push(`${getGraphX(node.x)} ${getGraphY(node.y)}`);
			if (stepped && (i < nodes.length - 1 || node.y > 0)) instructions.push(`${next.x} ${next.y}`);
		}

		return 'M ' + instructions.join(' L ');
	};

	const getMetricId = (metric: string) => `metric-${metric.toLowerCase().replace(/\W+/g, '-')}`;
</script>

<div class="graph">
	<div class="legend">
		{#each metrics as metric}
			<div class="legend-metric">
				<input
					type="checkbox"
					id={getMetricId(metric.label)}
					bind:group={visibleMetrics}
					disabled={visibleMetrics.length === 1 && visibleMetrics.includes(metric.label)}
					value={metric.label}
				/>
				<label class="legend-control" for={getMetricId(metric.label)}>
					<div class={['legend-color', metric.color]}></div>
					<span class="legend-label">
						{metric.label}
					</span>
				</label>
			</div>
		{/each}
	</div>
	<svg
		class:selectable
		viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
		onpointerdown={handleClick}
		onpointermove={handleMouseMove}
		role="presentation"
		bind:this={graphicElement}
	>
		<!-- <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} /> -->
		<line class="stroked" x1={graphX} y1={graphY} x2={graphX} y2={graphBottom} />
		<line class="stroked" x1={graphX} y1={graphBottom} x2={graphRight} y2={graphBottom} />

		{#each x.labels as label}
			{@const x = getGraphX(label.proportion)}
			{@const y = graphBottom}
			<line class="stroked" x1={x} y1={y - 2} x2={x} y2={y + 4} stroke-width="1" />

			<text
				class="label"
				{x}
				{y}
				text-anchor="end"
				dominant-baseline="middle"
				transform="rotate(-90 {x} {y}) translate(-8)"
			>
				{label.text}
			</text>
		{/each}

		{#each y.labels as label}
			{@const x = graphX}
			{@const y = getGraphY(label.proportion)}
			<line class="stroked" x1={x - 4} y1={y} x2={x + 2} y2={y} stroke-width="1" />

			<text
				class="label"
				{x}
				{y}
				text-anchor="end"
				dominant-baseline="middle"
				transform="translate(-8)"
			>
				{label.text}
			</text>
			<!-- <circle class="node" cx={graphX} cy={getGraphY(label.proportion)} r="2" /> -->
		{/each}

		{#if marker.visible}
			<line
				class="marker"
				class:selectable
				x1={marker.x}
				y1={graphBottom}
				x2={marker.x}
				y2={graphY}
				stroke-width="1"
				stroke-dasharray={selectable != null ? '0' : '2 3'}
			/>

			<text
				class="label"
				x={marker.x + (marker.offset ? -8 : 8)}
				y={graphY + 20}
				text-anchor={marker.offset ? 'end' : 'start'}
				dominant-baseline="middle"
			>
				{marker.label}
			</text>
		{/if}

		{#each lines as line}
			<g class={[line.color]}>
				<path
					class="stroked"
					d={createPath(line.nodes)}
					fill="none"
					stroke="black"
					stroke-width="1"
				/>

				{#each line.nodes as node}
					<circle
						class="node"
						cx={getGraphX(node.x)}
						cy={getGraphY(node.y)}
						r="2"
					/>
				{/each}
			</g>
		{/each}

		{#if marker.visible}
			<line
				class="marker"
				class:selectable
				x1={marker.x}
				y1={graphBottom}
				x2={marker.x}
				y2={graphY}
				stroke-width="1"
				stroke-dasharray={selectable != null ? '0' : '2 3'}
			/>

			<text
				class="label"
				x={marker.x + (marker.offset ? -8 : 8)}
				y={graphY + 20}
				text-anchor={marker.offset ? 'end' : 'start'}
				dominant-baseline="middle"
			>
				{marker.label}
			</text>
		{/if}
	</svg>
</div>

<style lang="scss">
	@use '@scissors/media';
	.graph {
		--color-graphics: var(--color-text);

		.red {
			--color-graphics: var(--mtg-red);
		}

		.yellow {
			--color-graphics: gold;
		}

		.green {
			--color-graphics: var(--mtg-green);
		}
	}

	.legend {
		&-metric {
			display: inline-block;
			input {
				display: none;
				&:not(:checked) + .legend-control .legend-label {
					opacity: 0.5;
				}
				&:disabled + .legend-control {
					cursor: default;
				}
			}
		}
		&-control {
			cursor: pointer;
			display: flex;
			align-items: center;
			margin: 0 2em;
			font-size: 0.875em;
			gap: 0.5em;
		}

		&-color {
			background: var(--color-graphics);
			aspect-ratio: 6;
			width: 1em;
		}
	}
	.stroked {
		stroke: var(--color-graphics);
	}

	svg.selectable {
		cursor: pointer;
	}

	.node {
		cursor: pointer;
		fill: var(--color-graphics);
	}

	.label {
		fill: var(--color-graphics);
		font-size: 8pt;
		// font-family: cursive;
	}

	.marker {
		stroke: var(--color-graphics);
		opacity: 0.6;
	}
</style>
