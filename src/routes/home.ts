import { Controller } from '@vueent/core';
import { tracked } from '@vueent/reactive';

import { registerController, injectService as service } from '@/vueent';
import type { ModelType as Human, Item } from '@/models/human';
import { splice } from '@/utilities/splice';
import StoreService from '@/services/store';
import { HumansCollection } from '@/collections';

export enum Message {
  none,
  success,
  error
}

export default class HomeController extends Controller {
  @service(StoreService) private readonly store!: StoreService;

  private _documentFakeIdCounter = 0;
  private _itemFakeIdCounter = 0;
  private _itemValueFakeIdCounter = 0;
  @tracked private _message = Message.none;

  @tracked public human: Human;

  public get message() {
    return this._message;
  }

  constructor() {
    super();

    this.human = this.store.get(HumansCollection).create();
  }

  reset() {
    this._message = Message.none;
  }

  destroy() {
    this.human.destroy();
    this._documentFakeIdCounter = 0;
    this._itemFakeIdCounter = 0;
    this._itemValueFakeIdCounter = 0;
  }

  public async send() {
    this.human.v.touch();
    this._message = Message.none;

    if (this.human.v.invalid) return;

    try {
      await this.human.save();
    } catch (e) {
      console.error('could not save a human', e);
      this._message = Message.error;

      return;
    }

    this._message = Message.success;
    this.human.destroy();
    this.human = this.store.get(HumansCollection).create();
  }

  public addPhone() {
    this.human.data.phones = [...this.human.data.phones, ''];
  }

  public removeLastPhone() {
    this.human.data.phones = this.human.data.phones.slice(0, this.human.data.phones.length - 1);
  }

  public addDocument() {
    this.human.data.documents = [...this.human.data.documents, { fakeId: ++this._documentFakeIdCounter, id: '', filename: '' }];
  }

  public removeDocument(fakeId: number) {
    const index = this.human.data.documents.findIndex(doc => doc.fakeId === fakeId);

    if (index !== -1) this.human.data.documents = splice(this.human.data.documents, index, 1);
  }

  public addItem() {
    this.human.data.items = [
      ...this.human.data.items,
      { fakeId: ++this._itemFakeIdCounter, values: [{ fakeId: ++this._itemValueFakeIdCounter, val: '' }] }
    ];
  }

  public removeItem(fakeId: number) {
    const index = this.human.data.items.findIndex(item => item.fakeId === fakeId);

    if (index !== -1) this.human.data.items = splice(this.human.data.items, index, 1);
  }

  public addItemValue(item: Item) {
    item.values = [...item.values, { fakeId: ++this._itemValueFakeIdCounter, val: '' }];
  }

  public removeItemValue(item: Item, fakeId: number) {
    const index = item.values.findIndex(value => value.fakeId === fakeId);

    if (index !== -1) item.values = splice(item.values, index, 1);
  }
}

registerController(HomeController);
