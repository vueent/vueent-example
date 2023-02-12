import { Controller } from '@vueent/core';

import { registerController, useService } from '@/vueent';
import StoreService from '@/services/store';

export default class AppController extends Controller {
  private readonly store: StoreService;
  constructor() {
    super();

    const humansMapStore = new Map();
    const getNewPk = this.genPk;

    this.store = useService(StoreService, {
      humans: { mapStore: humansMapStore, getNewPk }
    });
  }

  private genPk() {
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
}

registerController(AppController);
