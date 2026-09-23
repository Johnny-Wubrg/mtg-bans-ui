export const MIN_BANLIST_DATE = new Date('1993-08-05');
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export interface ParsedSearchDate {
	date: Date;
	americanFormat: boolean;
}

const withinRange = (date: Date, now: Date) => date >= MIN_BANLIST_DATE && date <= now;

const tryDate = (year: number, month: number, day: number): Date | null => {
	if (month < 1 || month > 12 || day < 1) return null;
	const date = new Date(year, month - 1, day);
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
		return null;
	}
	return date;
};

const isValidMonthDay = (month: number, day: number) =>
	month >= 1 && month <= 12 && day >= 1 && day <= DAYS_IN_MONTH[month - 1];

const normalizeYear = (year: number) => {
	if (year >= 100) return year;
	return year <= 50 ? 2000 + year : 1900 + year;
};

const dedupe = (results: ParsedSearchDate[]): ParsedSearchDate[] => {
	const seen = new Set<number>();
	return results.filter(({ date }) => {
		const time = date.getTime();
		if (seen.has(time)) return false;
		seen.add(time);
		return true;
	});
};

const resolveMonthDayYear = (a: number, b: number, year: number, now: Date): ParsedSearchDate[] => {
	const american = tryDate(year, a, b);
	const nonAmerican = tryDate(year, b, a);
	const results: ParsedSearchDate[] = [];
	if (american && withinRange(american, now)) results.push({ date: american, americanFormat: true });
	if (nonAmerican && withinRange(nonAmerican, now)) {
		results.push({ date: nonAmerican, americanFormat: false });
	}
	return dedupe(results);
};

const latestPastOccurrence = (month: number, day: number, now: Date): Date | null => {
	for (let year = now.getFullYear(); year >= 1993; year--) {
		const date = tryDate(year, month, day);
		if (date && withinRange(date, now)) return date;
	}
	return null;
};

const resolveMonthDayNoYear = (a: number, b: number, now: Date): ParsedSearchDate[] => {
	const results: ParsedSearchDate[] = [];
	if (isValidMonthDay(a, b)) {
		const date = latestPastOccurrence(a, b, now);
		if (date) results.push({ date, americanFormat: true });
	}
	if (isValidMonthDay(b, a)) {
		const date = latestPastOccurrence(b, a, now);
		if (date) results.push({ date, americanFormat: false });
	}
	return dedupe(results);
};

export const parseSearchDates = (text: string, now: Date): ParsedSearchDate[] => {
	const trimmed = text.trim();
	if (trimmed.length < 3) return [];

	const numeric = trimmed.match(/^(\d{1,4})[/.-](\d{1,4})(?:[/.-](\d{1,4}))?$/);
	if (numeric) {
		const [, p1, p2, p3] = numeric;
		if (p3 === undefined) return resolveMonthDayNoYear(Number(p1), Number(p2), now);
		if (p1.length === 4) {
			const date = tryDate(Number(p1), Number(p2), Number(p3));
			return date && withinRange(date, now) ? [{ date, americanFormat: true }] : [];
		}
		return resolveMonthDayYear(Number(p1), Number(p2), normalizeYear(Number(p3)), now);
	}

	const parsed = new Date(trimmed);
	if (parsed.toString() === 'Invalid Date' || !withinRange(parsed, now)) return [];
	return [{ date: parsed, americanFormat: !/^\d/.test(trimmed) }];
};
