export interface GraphNode<TValue, TX, TY> {
  value: TValue;
  label?: string;
	x: TX;
	y: TY;
}

export interface GraphMetric<TValue, TX, TY> {
	label: string;
	nodes: GraphNode<TValue, TX, TY>[];
}
