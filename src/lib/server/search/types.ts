import type { SmartSearchItem } from '$lib/models/Search';

export interface SearchProviderResult {
	items: SmartSearchItem[];
	hasMore?: boolean;
}

export interface SearchContext {
	now: Date;
}

export interface SearchProvider {
	id: string;
	groupLabel: string;
	showDisabledToggle?: { label: string; defaultValue?: boolean };
	search: (
		query: string,
		context: SearchContext
	) => Promise<SearchProviderResult> | SearchProviderResult;
}
