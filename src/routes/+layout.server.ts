import { getMainMenu } from '$lib/utils/menus';

export async function load() {
	return {
		mainMenu: await getMainMenu()
	};
}
