import { describe, expect, it } from 'vitest';
import { formatDaysUntil, getLatestAnnouncement, getNextAnnouncementStatus } from './announcements';
import type { Announcement } from '$lib/models/Announcement';

const announcement = (dateEffective: string, isFeatured = true): Announcement => ({
	id: 1,
	dateAnnounced: dateEffective,
	dateEffective,
	dateNextProjected: null,
	summary: '',
	isFeatured,
	sources: [],
	changesets: []
});

describe('getNextAnnouncementStatus', () => {
	const now = new Date('2026-05-01T12:00:00-07:00');

	it('is unknown when the date has not been set', () => {
		expect(getNextAnnouncementStatus(null, now)).toEqual({ status: 'unknown' });
	});

	it('is scheduled when more than a week away', () => {
		expect(getNextAnnouncementStatus('2026-06-01', now)).toEqual({
			status: 'scheduled',
			date: '2026-06-01'
		});
	});

	it('is imminent when exactly a week away', () => {
		expect(getNextAnnouncementStatus('2026-05-08', now)).toEqual({
			status: 'imminent',
			daysUntil: 7
		});
	});

	it('is imminent and due today on the day of', () => {
		expect(getNextAnnouncementStatus('2026-05-01', now)).toEqual({
			status: 'imminent',
			daysUntil: 0
		});
	});

	it('is overdue when the projected date has already passed', () => {
		expect(getNextAnnouncementStatus('2026-04-20', now)).toEqual({
			status: 'overdue',
			date: '2026-04-20'
		});
	});

	it('anchors "today" to Pacific midnight rather than UTC midnight', () => {
		// 11pm Pacific on 2026-04-30 is already 2026-05-01 in UTC
		const lateEvening = new Date('2026-04-30T23:00:00-07:00');

		expect(getNextAnnouncementStatus('2026-05-01', lateEvening)).toEqual({
			status: 'imminent',
			daysUntil: 1
		});
	});
});

describe('formatDaysUntil', () => {
	it('renders a zero day count as "today"', () => {
		expect(formatDaysUntil(0)).toBe('today');
	});

	it('pluralizes day counts above one', () => {
		expect(formatDaysUntil(1)).toBe('in 1 day');
		expect(formatDaysUntil(5)).toBe('in 5 days');
	});
});

describe('getLatestAnnouncement', () => {
	it('returns undefined for an empty list', () => {
		expect(getLatestAnnouncement([])).toBeUndefined();
	});

	it('picks the announcement with the latest effective date', () => {
		const oldest = announcement('2020-01-01');
		const middle = announcement('2022-06-15');
		const newest = announcement('2026-05-01');

		expect(getLatestAnnouncement([middle, oldest, newest])).toBe(newest);
	});

	it('ignores announcements not flagged for the homepage banner', () => {
		const featured = announcement('2022-06-15');
		const unfeaturedNewest = announcement('2026-05-01', false);

		expect(getLatestAnnouncement([featured, unfeaturedNewest])).toBe(featured);
	});
});
