export interface Card {
    scryfallId: string;
    name: string;
    scryfallImageUri: string;
    scryfallUri: string;
}

export interface FormatBans {
    format: string;
    banned: Card[];
    restricted: Card[];
}