import { Controller } from '@vueent/core';
import { tracked } from '@vueent/reactive';

import { registerController, injectService as service } from '@/vueent';
import StoreService from '@/services/store';
import { HumansCollection } from '@/collections';
import type { ModelType as Human } from '@/models/human';

export default class ListController extends Controller {
  @service(StoreService) private readonly store!: StoreService;

  @tracked private _items: Human[] = [];
  @tracked private _error = false;

  public get items() {
    return this._items;
  }

  public get error() {
    return this._error;
  }

  init() {
    this.loadItems();
  }

  destroy() {
    const coll = this.store.get(HumansCollection);

    this._items.forEach(item => coll.unload(item.uid));
  }

  public async remove(item: Human) {
    this._error = false;
    item.delete();

    try {
      await item.save();
    } catch (e) {
      console.error('could not remove an item by the reason:', e);
      this._error = true;

      return;
    }

    await this.loadItems();
  }

  private async loadItems() {
    let items;

    try {
      items = await this.store.get(HumansCollection).find();
    } catch (e) {
      return;
    }

    this._items = items;
  }
}

registerController(ListController);
