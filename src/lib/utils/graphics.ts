import type {
	ComputedMetric,
	ComputedNode,
	GraphDataPoint,
	GraphMetric,
	GraphNode,
	GraphSettings
} from '$lib/models/Graphics';

const getValue = (input: GraphDataPoint): number => {
	if (input instanceof Date) return input.valueOf();

	return input;
};

function getLines<TValue, TX extends GraphDataPoint, TY extends GraphDataPoint>(
	metrics: GraphMetric<TValue, TX, TY>[],
	xMinValue: number,
	xDiff: number,
	yMinValue: number,
	yDiff: number
): ComputedMetric<TValue>[] {
	return metrics.map((m) => {
		return {
			label: m.label,
			color: m.color ?? 'white',
			nodes: m.nodes.reduce((a, n) => {
				const x = (getValue(n.x) - xMinValue) / xDiff;
				const y = (getValue(n.y) - yMinValue) / yDiff;

				if (a.length > 1 && a[a.length - 1].y === y) return a;

				a.push({
					value: n.value,
					label: n.label ?? '',
					x,
					y
				});

				return a;
			}, [] as ComputedNode<TValue>[])
		};
	});
}

type GetValuesReturn<P extends 'x' | 'y', TX, TY> = P extends 'x' ? TX : TY;

function getValues<
  TValue,
  TX extends GraphDataPoint,
  TY extends GraphDataPoint,
  P extends 'x' | 'y'
>(
  metrics: GraphMetric<TValue, TX, TY>[],
  prop: P
): Map<number, GetValuesReturn<P, TX, TY>> {
  return new Map(
    metrics
      .flatMap(m => m.nodes)
      .map((n): [number, GraphNode<TValue, TX, TY>[P]] => [getValue(n[prop]), n[prop]])
      .toSorted((a, b) => a[0] - b[0])
      .values()
  ) as Map<number, GetValuesReturn<P, TX, TY>>;
}

export const getGraphData = <TValue, TX extends GraphDataPoint, TY extends GraphDataPoint>(
	settings: GraphSettings<TValue, TX, TY>
) => {
	const { metrics, xMin, xMax, yMin, yMax } = settings;

	const xValues = getValues(metrics, 'x');

	const xMinValue = xMin ? getValue(xMin) : Math.min(...xValues.keys());
	const xMaxValue = xMax ? getValue(xMax) : Math.max(...xValues.keys());
	const xDiff = xMaxValue - xMinValue;

	const yValues = getValues(metrics, 'y');

	const yMinValue = yMin ? getValue(yMin) : Math.min(0, ...yValues.keys());
	let yMaxValue = yMax ? getValue(yMax) : Math.max(...yValues.keys());
	yMaxValue = Math.ceil(yMaxValue * 1.1);
	const yDiff = yMaxValue - yMinValue;

	const lines: ComputedMetric<TValue>[] = getLines<TValue, TX, TY>(
		metrics,
		xMinValue,
		xDiff,
		yMinValue,
		yDiff
	);

	return { lines };
};
