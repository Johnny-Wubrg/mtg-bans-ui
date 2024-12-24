export interface Card {
    scryfallId: string;
    name: string;
    scryfallImageUri: string;
    scryfallUri: string;
    classification: Classification;
}

export interface Classification {
    id: number;
    summary: string;
}

export interface FormatBans {
    format: string;
    banned: Card[];
    restricted: Card[];
}