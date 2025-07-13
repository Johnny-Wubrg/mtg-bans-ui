import { getFormats } from '$lib/api/formats';

export interface MenuLink {
	href: string;
	label: string;
	children?: MenuLink[];
}

export const getMainMenu = async (): Promise<MenuLink[]> => {
	const formats = await getFormats();

	return [
		{
			href: '/formats',
			label: 'Formats',
			children: formats.map((f) => ({ href: `/formats/${f.slug}`, label: f.name }))
		},
		{ href: '/banlist', label: 'Banlist' },
		{ href: '/contact', label: 'Contact' }
	];
};
