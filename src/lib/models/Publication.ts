export interface Publication {
	id: number;
	title: string;
	uri: string;
	hasArchive: boolean;
}

export interface PublicationArchive extends Publication {
	contentHtml: string | null;
}
