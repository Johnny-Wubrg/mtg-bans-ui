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

interface GraphLabel {
	text: string;
	proportion: number;
}

const createDateIncrementer = (diff: number): ((val: Date) => Date) => {
	return (val: Date) => {
		const d = new Date(val);
		if (diff > 20) return new Date(d.setFullYear(d.getFullYear() + 1));
		if (diff > 10) return new Date(d.setMonth(d.getMonth() + 6));
		return new Date(d.setMonth(d.getMonth() + 3));
	};
};

const getDateLabels = (pt: KeyPoints) => {
	const labels: GraphLabel[] = [];

	const min = new Date(pt.min);
	const max = new Date(pt.max);

	const diffInYears = pt.diff / (365.25 * 24 * 60 * 60 * 1000);

	const formatter = new Intl.DateTimeFormat('en-US', {
		month: diffInYears > 20 ? undefined : 'short',
		year: 'numeric'
	});
	const increment = createDateIncrementer(diffInYears);

	let next = increment(min);
	next.setDate(1);
	next.setMonth(0);

	while (next <= max) {
		labels.push({
			text: formatter.format(next),
			proportion: (next.valueOf() - pt.min) / pt.diff
		});

		next = increment(next);
	}

	return labels;
};

const createNumIncrementer = (diff: number): ((val: number) => number) => {
	if (diff > 100) return (val: number) => val + 20;
	if (diff > 50) return (val: number) => val + 10;
	if (diff > 20) return (val: number) => val + 5;
	return (val: number) => val + 2;
};

const getLabels = (pt: KeyPoints, isDate: boolean) => {
	if (isDate) return getDateLabels(pt);

	const labels: GraphLabel[] = [];

	const { min, max, diff } = pt;

	const increment = createNumIncrementer(diff);

	let next = increment(min);

	labels.push({
		text: min.toLocaleString(),
		proportion: 0
	});

	while (next <= max) {
		labels.push({
			text: next.toLocaleString(),
			proportion: (next - min) / diff
		});

		next = increment(next);
	}

	return labels;
};

export const getGraphData = <TValue, TX extends GraphDataPoint, TY extends GraphDataPoint>(
	settings: GraphSettings<TValue, TX, TY>
) => {
	const { metrics, xMin, xMax, yMin, yMax } = settings;

	const xValues = getValues(metrics, 'x');
	const xPoints = getKeyPoints(xValues, xMin, xMax);
	const xLabels = getLabels(xPoints, metrics[0].nodes[0].x instanceof Date);

	const yValues = getValues(metrics, 'y');
	const yPoints = getKeyPoints(yValues, yMin, yMax);
	const yLabels = getLabels(yPoints, metrics[0].nodes[0].y instanceof Date);

	const lines: ComputedMetric<TValue>[] = getLines<TValue, TX, TY>(metrics, xPoints, yPoints);

	return { lines, labels: { x: xLabels, y: yLabels } };
};
