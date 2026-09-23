export interface CardSearchResult {
	scryfallId: string;
	name: string;
	scryfallImageUri: string | null;
	known: boolean;
}

export interface CardSearchResponse {
	results: CardSearchResult[];
	hasMore: boolean;
}

export interface SmartSearchItem {
	id: string;
	label: string;
	href?: string;
	imageUri?: string | null;
	disabled?: boolean;
	disabledLabel?: string;
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
