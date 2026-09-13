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
