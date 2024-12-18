import type { Card } from '$lib/models/Card';

export interface Announcement {
	id: number;
	dateAnnounced: string;
	dateEffective: string;
	summary: string;
	sources: string[];
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
