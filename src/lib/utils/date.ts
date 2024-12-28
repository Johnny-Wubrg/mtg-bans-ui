export const convertDate = (date: Date) =>
	new Date(date.setMinutes(date.getMinutes() + date.getTimezoneOffset()));

export const formatDate = (date: string) => {
	const parsedDate = new Date(date);
	const convertedDate = convertDate(parsedDate);

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
	return formatter.format(convertedDate);
};

export const formatIsoDate = (date: Date) => date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();