import { PUBLIC_APP_NAME, PUBLIC_MAINTENANCE } from '$env/static/public';
import { formatDate } from './date';

interface MaintenanceDetailsNone {
	status: 'none';
}

interface MaintenanceDetailsActive {
	status: 'scheduled' | 'active';
	date: Date;
	message: string;
}

type MaintenanceDetails = MaintenanceDetailsNone | MaintenanceDetailsActive;

export const getMaintenance = (): MaintenanceDetails => {
	if (!PUBLIC_MAINTENANCE) {
		return {
			status: 'none'
		};
	}

	const maintenanceDatetime = new Date(PUBLIC_MAINTENANCE);
	const maintenanceDate = formatDate(maintenanceDatetime);
	const maintenanceTime = formatDate(maintenanceDatetime, { timeStyle: 'short' });

	if (maintenanceDatetime > new Date()) {
		return {
			status: 'scheduled',
			date: maintenanceDatetime,
			message: `${PUBLIC_APP_NAME} will be down for planned maintenance on ${maintenanceDate} starting at ${maintenanceTime}.`
		};
	}

	return {
		status: 'active',
    date: maintenanceDatetime,
    message: `${PUBLIC_APP_NAME} is currently undergoing routine maintenance. Some features may be unavailable at this time.`
	};
};
