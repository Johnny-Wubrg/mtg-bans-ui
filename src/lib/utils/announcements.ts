import type { Announcement } from '$lib/models/Announcement';

const PACIFIC_TIME_ZONE = 'America/Los_Angeles';
const IMMINENT_THRESHOLD_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

interface NextAnnouncementStatusUnknown {
	status: 'unknown';
}

interface NextAnnouncementStatusScheduled {
	status: 'scheduled';
	date: string;
}

interface NextAnnouncementStatusImminent {
	status: 'imminent';
	daysUntil: number;
}

interface NextAnnouncementStatusOverdue {
	status: 'overdue';
	date: string;
}

export type NextAnnouncementStatus =
	| NextAnnouncementStatusUnknown
	| NextAnnouncementStatusScheduled
	| NextAnnouncementStatusImminent
	| NextAnnouncementStatusOverdue;

const pacificCalendarDate = (date: Date) =>
	new Intl.DateTimeFormat('en-CA', {
		timeZone: PACIFIC_TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(date);

const daysUntilPacific = (dateIso: string, now: Date) => {
	const today = new Date(`${pacificCalendarDate(now)}T00:00:00Z`).getTime();
	const target = new Date(`${dateIso}T00:00:00Z`).getTime();

	return Math.round((target - today) / MS_PER_DAY);
};

export const getNextAnnouncementStatus = (
	dateNextProjected: string | null,
	now: Date = new Date()
): NextAnnouncementStatus => {
	if (!dateNextProjected) return { status: 'unknown' };

	const daysUntil = daysUntilPacific(dateNextProjected, now);

	if (daysUntil < 0) return { status: 'overdue', date: dateNextProjected };
	if (daysUntil <= IMMINENT_THRESHOLD_DAYS) return { status: 'imminent', daysUntil };

	return { status: 'scheduled', date: dateNextProjected };
};

export const formatDaysUntil = (daysUntil: number) =>
	daysUntil === 0 ? 'today' : `in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`;

export const getLatestAnnouncement = (announcements: Announcement[]): Announcement | undefined =>
	announcements
		.filter((announcement) => announcement.isFeatured)
		.reduce<Announcement | undefined>((latest, announcement) => {
			return !latest || announcement.dateEffective > latest.dateEffective ? announcement : latest;
		}, undefined);
