import type { EncodedData } from '@/models/human';

export interface Find {
  ids?: string[];
  email?: string;
  age?: number;
}

export interface FindOne {
  id: string;
}

export type Create = EncodedData;

export type Update = EncodedData;

export interface Destroy {
  id: string;
}
