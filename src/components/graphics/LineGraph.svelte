<script lang="ts" generics="TValue, TX  extends GraphDataPoint, TY extends GraphDataPoint">
	import type { ComputedNode, GraphDataPoint, GraphSettings } from '$lib/models/Graphics';
	import { getGraphData } from '$lib/utils/graphics';

	interface Props extends GraphSettings<TValue, TX, TY> {
		stepped?: boolean;
		onnodeclicked?: (val: TValue) => void;
	}

	const props: Props = $props();

	const { metrics, stepped = false, onnodeclicked } = props;

	const padding = 4;

	const yLabelWidth = 10;

	const xLabelHeight = 30;

	const graphWidth = 1000;
	const graphHeight = 200;
	const graphX = yLabelWidth + padding;
	const graphY = 0 + padding;
	const graphLeft = graphX + graphWidth;
	const graphBottom = graphY + graphHeight;

	const viewBoxWidth = graphWidth + yLabelWidth + 2 * padding;
	const viewBoxHeight = graphHeight + xLabelHeight + 2 * padding;

	let visibleMetrics = $state(metrics.map((m) => m.label));
	let metricsToShow = $derived(metrics.filter((m) => visibleMetrics.includes(m.label)));

	const { lines } = $derived(getGraphData({ ...props, metrics: metricsToShow }));

	const getGraphX = (magnitude: number) => graphX + graphWidth * magnitude;
	const getGraphY = (magnitude: number) => graphBottom - graphHeight * magnitude;

	const createPath = (nodes: ComputedNode<TValue>[]) => {
		let instructions = [];
		if (nodes[0].x > 0) instructions.push(`${getGraphX(nodes[0].x)} ${graphBottom}`);
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const next = {
				x: i >= nodes.length - 1 ? graphLeft : getGraphX(nodes[i + 1].x),
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
	<svg viewBox="0 0 {viewBoxWidth} {viewBoxHeight}">
		<!-- <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} /> -->
		<line class="stroked" x1={graphX} y1={graphY} x2={graphX} y2={graphBottom} />
		<line class="stroked" x1={graphX} y1={graphBottom} x2={graphLeft} y2={graphBottom} />

		{#each lines as line}
			<g class={[line.color]}>
				<path
					class="stroked"
					d={createPath(line.nodes)}
					fill="none"
					stroke="black"
					stroke-width="1"
				/>

				<!-- {#each line.nodes as node}
						<circle
						class="node"
						cx={getGraphX(node.x)}
						cy={getGraphY(node.y)}
						r="2"
						onclick={() => onnodeclicked?.(node.value)}
						onkeydown={(evt) =>
						evt.key !== 'Space' || !onnodeclicked || onnodeclicked?.(node.value)}
						role="button"
						tabindex="0"
						/>
						{/each} -->
			</g>
		{/each}
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

	.node {
		cursor: pointer;
		fill: var(--color-graphics);
	}
</style>
