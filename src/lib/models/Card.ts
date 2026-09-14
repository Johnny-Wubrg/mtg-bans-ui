import type { GraphColor } from './Graphics';

export interface Card {
	scryfallId: string;
	name: string;
	scryfallImageUri: string;
	scryfallUri: string;
	classification: Classification;
	formatStatuses: CardFormatStatus[] | null;
	legalityEvents: CardLegalityEvent[] | null;
	rationale: CardRationale | null;
}

export interface CardRationale {
	text: string;
	aiModel: string | null;
	dateUpdated: string;
	dateApproved: string | null;
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

export interface CardLegalityEvent {
	format: string | null;
	status: string;
	color: GraphColor;
	date: string;
	announcementId: number | null;
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
