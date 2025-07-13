import type { FormatBansLimitation } from './Card';

export interface Format {
  name: string;
  slug: string;
}

export interface FormatDetail extends Format {
  events: FormatEvent[]
  timeline: FormatSnapshot[];
}

export interface FormatEvent {
  nameUpdate: string;
  dateEffective: string;
  description: string;
}

export interface FormatSnapshot {
  date: string;
  limitations: FormatBansLimitation[];
}