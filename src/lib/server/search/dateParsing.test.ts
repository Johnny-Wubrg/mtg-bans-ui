import { describe, expect, it } from 'vitest';
import { parseSearchDates } from './dateParsing';

describe('parseSearchDates', () => {
	const now = new Date('2026-09-23T12:00:00-07:00');

	it('resolves an incomplete unambiguous date to its most recent past occurrence', () => {
		expect(parseSearchDates('10/21', now)).toEqual([
			{ date: new Date(2025, 9, 21), americanFormat: true }
		]);
	});

	it('returns both variants for an ambiguous incomplete date, American first', () => {
		const results = parseSearchDates('5/10', now);

		expect(results).toEqual([
			{ date: new Date(2026, 4, 10), americanFormat: true },
			{ date: new Date(2025, 9, 5), americanFormat: false }
		]);
	});

	it('dedupes an ambiguous date whose orderings resolve identically', () => {
		expect(parseSearchDates('4/4', now)).toEqual([
			{ date: new Date(2026, 3, 4), americanFormat: true }
		]);
	});

	it('resolves an unambiguous full date with a two-digit year', () => {
		expect(parseSearchDates('10/21/25', now)).toEqual([
			{ date: new Date(2025, 9, 21), americanFormat: true }
		]);
	});

	it('returns both variants for an ambiguous full date with distinct results', () => {
		expect(parseSearchDates('5/10/25', now)).toEqual([
			{ date: new Date(2025, 4, 10), americanFormat: true },
			{ date: new Date(2025, 9, 5), americanFormat: false }
		]);
	});

	it('parses an ISO date as unambiguous and American-neutral', () => {
		expect(parseSearchDates('2025-10-21', now)).toEqual([
			{ date: new Date(2025, 9, 21), americanFormat: true }
		]);
	});

	it('treats month-first textual dates as American', () => {
		const results = parseSearchDates('October 21, 2025', now);

		expect(results).toHaveLength(1);
		expect(results[0].americanFormat).toBe(true);
		expect(results[0].date.toDateString()).toBe(new Date(2025, 9, 21).toDateString());
	});

	it('treats day-first textual dates as non-American', () => {
		const results = parseSearchDates('21 October 2025', now);

		expect(results).toHaveLength(1);
		expect(results[0].americanFormat).toBe(false);
		expect(results[0].date.toDateString()).toBe(new Date(2025, 9, 21).toDateString());
	});

	it('rejects an invalid calendar date', () => {
		expect(parseSearchDates('2/30', now)).toEqual([]);
	});

	it('rejects dates before the earliest banlist', () => {
		expect(parseSearchDates('1990-01-01', now)).toEqual([]);
	});

	it('rejects dates in the future', () => {
		expect(parseSearchDates('2030-01-01', now)).toEqual([]);
	});

	it('rejects garbage or too-short input', () => {
		expect(parseSearchDates('42', now)).toEqual([]);
		expect(parseSearchDates('lightning bolt', now)).toEqual([]);
	});
});
