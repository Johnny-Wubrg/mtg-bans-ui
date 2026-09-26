import { searchCards } from '$lib/api/cards';
import type { CardSearchResult, SmartSearchPill } from '$lib/models/Search';
import type { SearchProvider } from '../types';

const getCardPill = (result: CardSearchResult): SmartSearchPill => {
	if (!result.known) return { label: 'No Banning Records', variant: 'faded' };

	if (!result.currentLimitation) return { label: 'Formerly Regulated', variant: 'neutral' };

	const { status, format, color, additionalFormatCount } = result.currentLimitation;
	const label =
		additionalFormatCount > 0
			? `${status} in ${format} +${additionalFormatCount}`
			: `${status} in ${format}`;

	return { label, variant: 'status', color };
};

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
				pill: getCardPill(result)
			})),
			hasMore: response.hasMore
		};
	}
};
