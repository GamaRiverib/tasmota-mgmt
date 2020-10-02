import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { WidgetGroupSettings } from '../widgets/device-view-settings';
const { Storage } = Plugins;

const KEY = 'TASMOTA::DATA';
const KEY_SETTINGS = 'SETTINGS';
const KEY_WIDGET_SETTINGS = 'WIDGET_SETTINGS';
const KEY_AUTH_DATA = 'AUTH_DATA';

export interface AppData {
  defaultHouse?: string;
  favorites?: string[];
}

export interface AuthData {
  code_verifier?: string;
  authorization_code?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_at: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform) {

  }

  private async getItem<T>(key: string): Promise<T> {
    if (this.platform.is('capacitor')) {
      const { value } = await Storage.get({ key });
      return JSON.parse(value) as T;
    } else if (this.platform.is('hybrid')) {
      return this.nativeStorage.getItem(key);
    }
    const data = localStorage.getItem(key);
    return JSON.parse(data) as T;
  }

  private async setItem<T>(key: string, data: T): Promise<void> {
    let value: string;
    if (this.platform.is('capacitor')) {
      value = JSON.stringify(data);
      await Storage.set({ key, value });
      return;
    } else if (this.platform.is('hybrid')) {
      return this.nativeStorage.setItem(key, data);
    }
    value = JSON.stringify(data);
    return localStorage.setItem(key, value);
  }

  private async removeItem(key: string): Promise<void> {
    if (this.platform.is('capacitor')) {
      await Storage.remove({ key });
      return;
    } else if (this.platform.is('hybrid')) {
      return this.nativeStorage.remove(key);
    }
    return localStorage.removeItem(key);
  }

  private async clearStorage(): Promise<void> {
    if (this.platform.is('capacitor')) {
      await Storage.clear();
    } else if (this.platform.is('hybrid')) {
      return this.nativeStorage.clear();
    }
    return localStorage.clear();
  }

  async getDefaultHouseId(): Promise<string | undefined> {
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem<AppData>(key) || {};
      return settings.defaultHouse;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return '';
      }
      console.log(reason);
      return '';
    }
  }

  async setDefaultHouseId(id: string): Promise<void> {
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem<AppData>(key) || {};
      settings.defaultHouse = id;
      await this.setItem(key, settings);
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        this.setItem(key, { defaultHouse: id });
      }
      console.log(reason);
      throw new Error('Error setting default house');
    }
  }

  async getFavorites(): Promise<Array<string>> {
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem(key) || {};
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
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem(key) || {};
      settings.favorites = favorites;
      await this.setItem(key, settings);
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        this.setItem(key, { favorites });
      }
      throw new Error('Error setting favorites');
    }
  }

  async setDeviceWidgetGroupSettings(deviceId: string, settings: WidgetGroupSettings): Promise<void> {
    try {
      const key = `${KEY}::${KEY_WIDGET_SETTINGS}::${deviceId}`;
      const deviceViewSettings: WidgetGroupSettings = await this.getItem(key);
      const newSettings = Object.assign(deviceViewSettings || {}, settings);
      await this.setItem(key, newSettings);
    } catch (reason) {
      throw new Error('Error saving device widget group settings');
    }
  }

  async getDeviceWidgetGroupSettings(deviceId: string): Promise<WidgetGroupSettings | null> {
    const key = `${KEY}::${KEY_WIDGET_SETTINGS}::${deviceId}`;
    try {
      const settings: WidgetGroupSettings = await this.getItem(key);
      return settings;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return null;
      }
      console.log(reason);
      throw new Error('Error getting device widget group settings');
    }
  }

  async setRoomWidgetGroupSettings(house: string, room: string, settings: WidgetGroupSettings): Promise<void> {
    try {
      const key = `${KEY}::${house}::${room}::${KEY_WIDGET_SETTINGS}`;
      const deviceViewSettings: WidgetGroupSettings = await this.getItem(key);
      const newSettings = Object.assign(deviceViewSettings || {}, settings);
      await this.setItem(key, newSettings);
    } catch (reason) {
      throw new Error('Error saving room widget group settings');
    }
  }

  async getRoomWidgetGroupSettings(house: string, room: string): Promise<WidgetGroupSettings | null> {
    const key = `${KEY}::${house}::${room}::${KEY_WIDGET_SETTINGS}`;
    try {
      const settings: WidgetGroupSettings = await this.getItem(key);
      return settings;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return null;
      }
      console.log(reason);
      throw new Error('Error getting room widget group settings');
    }
  }

  async removeAuthData(): Promise<void> {
    const key = `${KEY}::${KEY_AUTH_DATA}`;
    return this.removeItem(key);
  }

  async setAuthData(data: AuthData): Promise<void> {
    try {
      const key = `${KEY}::${KEY_AUTH_DATA}`;
      await this.setItem(key, data);
    } catch (reason) {
      throw new Error('Error saving auth data');
    }
  }

  async getAuthData(): Promise<AuthData | null> {
    const key = `${KEY}::${KEY_AUTH_DATA}`;
    try {
      const authData: AuthData = await this.getItem(key);
      return authData;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return null;
      }
      console.log(reason);
      throw new Error('Error getting auth data');
    }
  }

  async clear(): Promise<void> {
    return this.clearStorage();
  }
}
