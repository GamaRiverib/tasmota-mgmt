import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const KEY = 'TASMOTA::DATA';

export interface AppData {
  defaultHouse: string;
  favorites: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private nativeStorage: NativeStorage) { }

  async getDefaultHomeId(): Promise<string | undefined> {
    try {
      const settings: AppData = await this.nativeStorage.getItem(KEY) || {};
      return settings.defaultHouse;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return '';
      }
      console.log(reason);
      return '';
    }
  }

  async setDefaultHomeId(id: string): Promise<void> {
    try {
      const settings: AppData = await this.nativeStorage.getItem(KEY) || {};
      settings.defaultHouse = id;
      await this.nativeStorage.setItem(KEY, settings);
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        this.nativeStorage.setItem(KEY, { defaultHouse: id });
      }
      throw new Error('Error setting default broker');
    }
  }

  async getFavorites(): Promise<Array<string>> {
    try {
      const settings: AppData = await this.nativeStorage.getItem(KEY) || {};
      return settings.favorites || [];
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return [];
      }
      console.log(reason);
      return [];
    }
  }

  async setFavorites(favorites: string[]): Promise<void> {
    try {
      const settings: AppData = await this.nativeStorage.getItem(KEY) || {};
      settings.favorites = favorites;
      await this.nativeStorage.setItem(KEY, settings);
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        this.nativeStorage.setItem(KEY, { favorites });
      }
      throw new Error('Error setting favorites');
    }
  }
}
