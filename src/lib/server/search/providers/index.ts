import type { SearchProvider } from '../types';
import { cardProvider } from './cardProvider';
import { dateProvider } from './dateProvider';
import { formatProvider } from './formatProvider';

export const searchProviders: SearchProvider[] = [cardProvider, formatProvider, dateProvider];
