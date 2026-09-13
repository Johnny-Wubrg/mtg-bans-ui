import type { GraphColor } from './Graphics';

export interface Card {
	scryfallId: string;
	name: string;
	scryfallImageUri: string;
	scryfallUri: string;
	classification: Classification;
	formatStatuses: CardFormatStatus[] | null;
}

export interface Classification {
	displayOrder: number;
	summary: string;
}

export type CardFormatStatusType =
	| 'NeverBanned'
	| 'Limitation'
	| 'Rotated'
	| 'NotLegal'
	| 'Unbanned';

export interface CardFormatStatus {
	format: string;
	type: CardFormatStatusType;
	status: string | null;
	color: GraphColor | null;
	date: string | null;
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
