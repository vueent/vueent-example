import { StoreService as VueentStoreService } from '@vueent/store';

import { registerService } from '@/vueent';
import { HumansCollection } from '@/collections';

export default class StoreService extends VueentStoreService<HumansCollection> {
  constructor() {
    super([new HumansCollection()]);
  }
}

registerService(StoreService);
