import type { GraphColor } from './Graphics';

export interface CardSearchLimitation {
	format: string;
	status: string;
	color: GraphColor;
	additionalFormatCount: number;
}

export interface CardSearchResult {
	scryfallId: string;
	name: string;
	scryfallImageUri: string | null;
	known: boolean;
	currentLimitation: CardSearchLimitation | null;
}

export interface CardSearchResponse {
	results: CardSearchResult[];
	hasMore: boolean;
}

export interface SmartSearchPill {
	label: string;
	variant: 'status' | 'neutral' | 'faded';
	color?: GraphColor;
}

export interface SmartSearchItem {
	id: string;
	label: string;
	href?: string;
	imageUri?: string | null;
	disabled?: boolean;
	pill?: SmartSearchPill;
}

export interface SmartSearchGroup {
	id: string;
	label: string;
	items: SmartSearchItem[];
	hasMore: boolean;
	toggle?: { label: string; defaultValue?: boolean };
}

export interface SmartSearchResponse {
	groups: SmartSearchGroup[];
}
