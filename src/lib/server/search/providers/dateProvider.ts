import { formatDate, formatDateInternational, formatIsoDate } from '$lib/utils/date';
import { parseSearchDates } from '../dateParsing';
import type { SearchProvider } from '../types';

export const dateProvider: SearchProvider = {
	id: 'dates',
	groupLabel: 'Dates',
	search: (query, { now }) => ({
		items: parseSearchDates(query, now).map((parsed) => {
			const iso = formatIsoDate(parsed.date);
			const label = parsed.americanFormat
				? `View the banlist as it was on ${formatDate(parsed.date)}`
				: `Have a gander at the banlist of ${formatDateInternational(parsed.date)}`;
			return { id: iso, label, href: `/banlist?date=${iso}` };
		})
	})
};
