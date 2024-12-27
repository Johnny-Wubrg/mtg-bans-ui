export const formatDate = (date: string) => {
	const parsedDate = new Date(date);
	const convertedDate = new Date(
		parsedDate.setMinutes(parsedDate.getMinutes() + parsedDate.getTimezoneOffset())
	);

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
	return formatter.format(convertedDate);
};
