import { apiGet } from '$lib/api/utils';
import type { Announcement } from '$lib/models/Announcement';

export const getAnnouncements = () => apiGet<Announcement[]>('/announcements');
