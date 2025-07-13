import type { GraphColor } from './Graphics';

export interface Card {
	scryfallId: string;
	name: string;
	scryfallImageUri: string;
	scryfallUri: string;
	classification: Classification;
}

export interface Classification {
	displayOrder: number;
	summary: string;
}

export interface FormatBans {
	format: string;
	limitations: FormatBansLimitation[];
}

export interface FormatBansLimitation {
	status: string;
	color?: GraphColor;
	cards: Card[];
}
