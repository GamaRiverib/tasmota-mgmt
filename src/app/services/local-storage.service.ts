import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { DeviceViewSettings } from '../widgets/device-view-settings';

const KEY = 'TASMOTA::DATA';
const KEY_SETTINGS = 'SETTINGS';
const KEY_WIDGET_SETTINGS = 'WIDGET_SETTINGS';

export interface AppData {
  defaultHouse: string;
  favorites: string[];
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
    if (this.platform.is('hybrid')) {
      return this.nativeStorage.getItem(key);
    }
    const data = localStorage.getItem(key);
    return JSON.parse(data) as T;
  }

  private async setItem<T>(key: string, value: T): Promise<void> {
    if (this.platform.is('hybrid')) {
      return this.nativeStorage.setItem(key, value);
    }
    const data = JSON.stringify(value);
    return localStorage.setItem(key, data);
  }

  async getDefaultHomeId(): Promise<string | undefined> {
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem<AppData>(key);
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
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem<AppData>(key);
      settings.defaultHouse = id;
      await this.setItem(key, settings);
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        this.setItem(key, { defaultHouse: id });
      }
      throw new Error('Error setting default broker');
    }
  }

  async getFavorites(): Promise<Array<string>> {
    const key = `${KEY}::${KEY_SETTINGS}`;
    try {
      const settings: AppData = await this.getItem(key);
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
      const settings: AppData = await this.getItem(key);
      settings.favorites = favorites;
      await this.setItem(key, settings);
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        this.setItem(key, { favorites });
      }
      throw new Error('Error setting favorites');
    }
  }

  async setDeviceViewSettings(deviceId: string, settings: DeviceViewSettings): Promise<void> {
    try {
      const key = `${KEY}::${KEY_WIDGET_SETTINGS}::${deviceId}`;
      const deviceViewSettings: DeviceViewSettings = await this.getItem(key);
      const newSettings = Object.assign(deviceViewSettings || {}, settings);
      await this.setItem(key, newSettings);
    } catch (reason) {
      throw new Error('Error saving widget settings');
    }
  }

  async getDeviceViewSettings(deviceId: string): Promise<DeviceViewSettings | null> {
    const key = `${KEY}::${KEY_WIDGET_SETTINGS}::${deviceId}`;
    try {
      const settings: DeviceViewSettings = await this.getItem(key);
      return settings;
    } catch (reason) {
      if (reason.code && reason.code === 2) {
        return null;
      }
      console.log(reason);
      throw new Error('Error getting device view settings');
    }
  }
}
