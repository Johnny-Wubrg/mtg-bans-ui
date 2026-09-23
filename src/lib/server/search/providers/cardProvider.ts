import { searchCards } from '$lib/api/cards';
import type { SearchProvider } from '../types';

export const cardProvider: SearchProvider = {
	id: 'cards',
	groupLabel: 'Cards',
	showDisabledToggle: { label: 'Show all cards', defaultValue: true },
	search: async (query) => {
		const response = await searchCards(query);

		return {
			items: response.results.map((result) => ({
				id: result.scryfallId,
				label: result.name,
				imageUri: result.scryfallImageUri,
				href: result.known ? `/cards/${result.scryfallId}` : undefined,
				disabled: !result.known,
				disabledLabel: result.known ? undefined : 'No banning records'
			})),
			hasMore: response.hasMore
		};
	}
};
