<script lang="ts" generics="TValue, TX, TY">
	import type { GraphMetric } from '$lib/models/Graphics';

	interface Props {
		metrics: GraphMetric<TValue, TX, TY>[];
		xMin?: TX;
		xMax?: TX;
		yMin?: TY;
		yMax?: TY;
		getXValue?: (x: TX) => number;
		getYValue?: (y: TY) => number;
		onnodeclicked?: (val: TValue) => void;
	}

	interface ComputedNode {
		x: number;
		y: number;
		value: TValue;
		label: string;
	}

	interface ComputedMetric {
		label: string;
		nodes: ComputedNode[];
	}

	const {
		metrics,
		xMin,
		xMax,
		yMin,
		yMax,
		getXValue = (x) => parseInt(x as string),
		getYValue = (y) => parseInt(y as string),
		onnodeclicked
	}: Props = $props();

	const yLabelWidth = 10;

	const xLabelHeight = 30;

	const graphWidth = 1000;
	const graphHeight = 100;
	const graphX = yLabelWidth;
	const graphY = 0;
	const graphLeft = graphX + graphWidth;
	const graphBottom = graphY + graphHeight;

	const viewBoxWidth = graphWidth + yLabelWidth;
	const viewBoxHeight = graphHeight + xLabelHeight;

	const xValues = new Map(
		metrics
			.flatMap((m) => m.nodes)
			.map(({ x }): [number, TX] => [getXValue(x), x])
			.toSorted((a, b) => a[0] - b[0])
			.values()
	);

	const xMinValue = xMin ? getXValue(xMin) : Math.min(...xValues.keys());
	const xMaxValue = xMax ? getXValue(xMax) : Math.max(...xValues.keys());
	const xDiff = xMaxValue - xMinValue;

	const yValues = new Map(
		metrics
			.flatMap((m) => m.nodes)
			.map(({ y }): [number, TY] => [getYValue(y), y])
			.toSorted((a, b) => a[0] - b[0])
			.values()
	);

	const yMinValue = yMin ? getYValue(yMin) : Math.min(...yValues.keys());
	const yMaxValue = yMax ? getYValue(yMax) : Math.max(...yValues.keys());
	const yDiff = yMaxValue - yMinValue;

	const lines: ComputedMetric[] = metrics.map((m) => {
		return {
			label: m.label,
			nodes: m.nodes.reduce((a, n) => {
				const xMag = (getXValue(n.x) - xMinValue) / xDiff;
				const yMag = (getYValue(n.y) - yMinValue) / yDiff;
				const x = graphX + graphWidth * xMag;
				const y = graphHeight - (graphY + graphHeight * yMag);

				if (a.length > 1 && a[a.length - 1].y === y) return a;

				a.push({
					value: n.value,
					label: n.label ?? '',
					x,
					y
				});

				return a;
			}, [] as ComputedNode[])
		};
	});
</script>

<svg viewBox="0 0 {viewBoxWidth} {viewBoxHeight}">
	<!-- <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} /> -->
	<line class="stroked" x1={graphX} y1={graphY} x2={graphX} y2={graphBottom} />
	<line class="stroked" x1={graphX} y1={graphBottom} x2={graphLeft} y2={graphBottom} />

	{#each lines as line}
		<path
			class="stroked"
			d={`M ${line.nodes.map((n, i) => `${n.x} ${n.y}`).join(' L ')}`}
			fill="none"
			stroke="black"
			stroke-width="1"
		/>

		{#each line.nodes as node}
			<circle
				class="node"
				cx={node.x}
				cy={node.y}
				r="2"
				onclick={() => onnodeclicked?.(node.value)}
				onkeydown={(evt) => evt.key !== 'Space' || !onnodeclicked || onnodeclicked?.(node.value)}
				role="button"
				tabindex="0"
			/>
		{/each}
	{/each}
</svg>

<style>
	.stroked {
		stroke: var(--color-text);
	}

	.node {
		cursor: pointer;
		fill: var(--color-text);
	}
</style>
