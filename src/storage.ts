/**
 * @module storage emulates a server.
 */

import type { EncodedData } from '@/models/human';

const storage = new Map<string, string>();

function get(key: string): any | undefined {
  const result = storage.get(key);

  return result ? JSON.parse(result) : undefined;
}

function forEach(callback: (value: any) => void) {
  for (const [, item] of storage) {
    callback(JSON.parse(item));
  }
}

function genPk() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < 32) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

export async function find(queryParams?: { ids?: string[]; email?: string; age?: number }): Promise<any> {
  const res: { items: EncodedData[] } = { items: [] };

  if (queryParams?.ids?.length) {
    for (const id of queryParams.ids) {
      const item = get(id);

      if (item) res.items.push(item);
    }
  } else if (queryParams) {
    const filters: Array<(v: EncodedData) => boolean> = [];

    if (queryParams.email) {
      filters.push((v: EncodedData) => v.email === queryParams.email);
    } else if (queryParams.age) {
      filters.push((v: EncodedData) => v.age === queryParams.age);
    }

    forEach(item => {
      if (filters.every(filter => filter(item))) res.items.push(item);
    });
  } else {
    forEach(item => res.items.push(item));
  }

  res.items.sort((a, b) => a.id.localeCompare(b.id));

  return JSON.stringify(res);
}

export async function findOne(id: string): Promise<any> {
  const data = storage.get(id);

  if (!data) throw new Error('resource not found');

  return data;
}

export async function create(data: string): Promise<any> {
  const item = JSON.parse(data);

  item.id = genPk();

  const encoded = JSON.stringify(item);

  storage.set(item.id, encoded);

  return encoded;
}

export async function update(id: string, data: string): Promise<any> {
  if (!storage.has(id)) throw new Error('resource not found');

  const item = JSON.parse(data);

  item.id = id;

  const encoded = JSON.stringify(item);

  storage.set(id, encoded);

  return encoded;
}

export async function destroy(key: string): Promise<void> {
  if (storage.has(key)) storage.delete(key);
}
