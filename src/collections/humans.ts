import { Collection } from '@vueent/store';

import type { Data, EncodedData, ModelType } from '@/models/human';
import { Model } from '@/models/human';
import * as api from '@/api/humans';

export class HumansCollection extends Collection<Model, Data, EncodedData, ModelType> {
  constructor() {
    super({
      construct: Model,
      createData: (data: EncodedData): Promise<unknown> => {
        return api.create(data);
      },
      destroyData: (id: unknown): Promise<void> => {
        return api.destroy({ id: id as string });
      },
      updateData: (id: unknown, data: EncodedData): Promise<unknown> => {
        return api.update({ ...data, id: id as string });
      },
      loadOneData: (pk: unknown): Promise<EncodedData> => {
        return api.findOne({ id: pk as string });
      },
      loadManyData: async (options: {
        queryParams?: {
          ids?: string[];
          email?: string;
          age?: number;
        };
      }): Promise<EncodedData[]> => {
        const response = await api.find(options.queryParams ? options.queryParams : {});

        return response.items;
      }
    });
  }

  public normalize(encoded: EncodedData): Data {
    let documentsCounter = 0;
    let itemsCounter = 0;
    let valuesCounter = 0;

    return {
      id: encoded.id,
      phone: encoded.phone,
      phones: encoded.phones.slice(),
      age: String(encoded.age),
      email: encoded.email,
      credentials: {
        first: encoded.credentials.first,
        second: encoded.credentials.second,
        last: encoded.credentials.last
      },
      documents: encoded.documents.map(doc => ({
        fakeId: ++documentsCounter,
        id: doc.id,
        filename: doc.filename
      })),
      items: encoded.items.map(item => ({
        fakeId: ++itemsCounter,
        values: item.values.map(v => ({
          fakeId: ++valuesCounter,
          val: v.val
        }))
      }))
    };
  }

  public denormalize(data: Data): EncodedData {
    return {
      id: data.id,
      phone: data.phone,
      phones: data.phones.slice(),
      age: Number(data.age),
      email: data.email,
      credentials: {
        first: data.credentials.first,
        second: data.credentials.second,
        last: data.credentials.last
      },
      documents: data.documents.map(doc => ({
        id: doc.id,
        filename: doc.filename
      })),
      items: data.items.map(item => ({
        values: item.values.map(v => ({ val: v.val }))
      }))
    };
  }
}
