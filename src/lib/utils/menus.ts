export interface MenuLink {
	href: string;
	label: string;
}

export const getMainMenu = async (): Promise<MenuLink[]> => {
	return [
		{ href: '/banlist', label: 'Banlist' },
		{ href: '/contact', label: 'Contact' }
	];
};
