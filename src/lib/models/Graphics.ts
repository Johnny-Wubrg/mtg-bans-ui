export type GraphDataPoint = number | Date;

export interface GraphNode<TValue, TX extends GraphDataPoint, TY extends GraphDataPoint> {
	value: TValue;
	label?: string;
	x: TX;
	y: TY;
}

export interface GraphMetric<TValue, TX extends GraphDataPoint, TY extends GraphDataPoint> {
	label: string;
	color?: GraphColor;
	nodes: GraphNode<TValue, TX, TY>[];
}

export interface GraphSettings<TValue, TX extends GraphDataPoint, TY extends GraphDataPoint> {
	metrics: GraphMetric<TValue, TX, TY>[];
	xMin?: TX;
	xMax?: TX;
	yMin?: TY;
	yMax?: TY;
}

export interface ComputedNode<TValue> {
	x: number;
	y: number;
	value: TValue;
	label: string;
}

export interface ComputedMetric<TValue> {
	label: string;
	color: GraphColor;
	nodes: ComputedNode<TValue>[];
}

export type GraphColor = 'green' | 'red' | 'yellow' | 'white';