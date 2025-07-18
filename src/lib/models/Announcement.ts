import type { Card } from '$lib/models/Card';
import type { Publication } from './Publication';

export interface Announcement {
	id: number;
	dateAnnounced: string;
	dateEffective: string;
	summary: string;
	sources: Publication[];
	changesets: AnnouncementFormat[];
}

export interface AnnouncementFormat {
	format: string;
	changes: AnnouncementChange[];
}

export interface AnnouncementChange {
	type: string;
	cards: Card[];
}
