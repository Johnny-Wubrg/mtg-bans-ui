import type {
	ComputedMetric,
	ComputedNode,
	GraphDataPoint,
	GraphMetric,
	GraphNode,
	GraphSettings
} from '$lib/models/Graphics';

interface KeyPoints {
	min: number;
	max: number;
	diff: number;
}

const getValue = (input: GraphDataPoint): number => {
	if (input instanceof Date) return input.valueOf();

	return input;
};

function getLines<TValue, TX extends GraphDataPoint, TY extends GraphDataPoint>(
	metrics: GraphMetric<TValue, TX, TY>[],
	xPoints: KeyPoints,
	yPoints: KeyPoints
): ComputedMetric<TValue>[] {
  return metrics.map((m) => {
		return {
			label: m.label,
			color: m.color ?? 'white',
      nodes: m.nodes.reduce((a, n) => {
				const x = (getValue(n.x) - xPoints.min) / xPoints.diff;
				const y = (getValue(n.y) - yPoints.min) / yPoints.diff;

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
>(metrics: GraphMetric<TValue, TX, TY>[], prop: P): Map<number, GetValuesReturn<P, TX, TY>> {
	return new Map(
		metrics
			.flatMap((m) => m.nodes)
			.map((n): [number, GraphNode<TValue, TX, TY>[P]] => [getValue(n[prop]), n[prop]])
			.toSorted((a, b) => a[0] - b[0])
			.values()
	) as Map<number, GetValuesReturn<P, TX, TY>>;
}

const getKeyPoints = <T extends GraphDataPoint>(
	values: Map<number, T>,
	inputMin?: T,
	inputMax?: T
): KeyPoints => {
	const min = inputMin !== undefined ? getValue(inputMin) : Math.min(...values.keys());
	const max = inputMax !== undefined ? getValue(inputMax) : Math.max(...values.keys());
	return { min, max, diff: max - min };
};

export const getGraphData = <TValue, TX extends GraphDataPoint, TY extends GraphDataPoint>(
	settings: GraphSettings<TValue, TX, TY>
) => {
	const { metrics, xMin, xMax, yMin, yMax } = settings;

	const xValues = getValues(metrics, 'x');
	const xPoints = getKeyPoints(xValues, xMin, xMax);

	const yValues = getValues(metrics, 'y');
	const yPoints = getKeyPoints(yValues, yMin, yMax);

	const lines: ComputedMetric<TValue>[] = getLines<TValue, TX, TY>(metrics, xPoints, yPoints);

	return { lines };
};
