export interface Format {
  name: string;
  slug: string;
}

export interface FormatDetail extends Format {
  events: FormatEvent[]
}

export interface FormatEvent {
  nameUpdate: string;
  dateEffective: string;
  description: string;
}