import type { EncodedData } from '@/models/human';

export interface Find {
  items: EncodedData[];
}

export type FindOne = EncodedData;
export type Create = EncodedData;
export type Update = EncodedData;
