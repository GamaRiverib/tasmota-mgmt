import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { House } from '../models/house';
import { Room, RoomDevice } from '../models/room';
import { Device } from '../models/device';
import { DeviceConfig } from '../models/device-config';
import { Command } from '../models/command';
import { SERVER_URL } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';

const SOCKET_EVENTS = {
  DEVICE_CONNECTED: 'device-connected',
  DEVICE_DISCONNECTED: 'device-disconnected',
  DEVICE_STATE_CHANGED: 'device-state-changed',
  DEVICE_CONFIG_CHANGED: 'device-config-changed',
  DEVICE_COMMAND_RESULT: 'device-command-result'
};

@Injectable({
  providedIn: 'root'
})
export class TasmotaApiService {

  private static devices: Device[];
  private static deviceConfig: { [ device: string ]: DeviceConfig } = {};

  private deviceStateChange: EventEmitter<Device> = new EventEmitter<Device>();

  constructor(
    private httpClient: HttpClient,
    private socket: Socket) {
      this.initializeSocket();
  }

  private initializeSocket(): void {
    this.socket.connect();
    const name = `tasmota-mgmt-app-${Math.random() * 10000}`;
    this.socket.emit('client-name', { name });
    this.socket.on(SOCKET_EVENTS.DEVICE_CONNECTED, this.onDeviceConnectedHandler);
    this.socket.on(SOCKET_EVENTS.DEVICE_DISCONNECTED, this.onDeviceDisconnectedHandler);
    this.socket.on(SOCKET_EVENTS.DEVICE_STATE_CHANGED, this.onDeviceStateChangedHandler.bind(this));
    this.socket.on(SOCKET_EVENTS.DEVICE_CONFIG_CHANGED, this.onDeviceConfigChangedHandler);
    this.socket.on(SOCKET_EVENTS.DEVICE_COMMAND_RESULT, this.onDeviceCommandResultHandler.bind(this));
  }

  private onDeviceConnectedHandler(data: { device: string }): void {
    console.log('onDeviceConnected', data);
    if (TasmotaApiService.devices) {
      const index = TasmotaApiService.devices.findIndex(d => d.id === data.device);
      if (index < 0) {
        return;
      }
      TasmotaApiService.devices[index].online = true;
    }
  }

  private onDeviceDisconnectedHandler(data: { device: string }): void {
    console.log('onDeviceDisconnected', data);
    if (TasmotaApiService.devices) {
      const index = TasmotaApiService.devices.findIndex(d => d.id === data.device);
      if (index < 0) {
        return;
      }
      TasmotaApiService.devices[index].online = false;
    }
  }

  private onDeviceStateChangedHandler(data: { device: string, state: any }): void {
    console.log('onDeviceStateChanged', data);
    if (TasmotaApiService.devices) {
      const index = TasmotaApiService.devices.findIndex(d => d.id === data.device);
      if (index < 0) {
        return;
      }
      TasmotaApiService.devices[index] = Object.assign(TasmotaApiService.devices[index], data.state);
      this.deviceStateChange.emit(TasmotaApiService.devices[index]);
    }
  }

  private onDeviceConfigChangedHandler(data: { device: string, config: any }): void {
    console.log('onDeviceConfigChanged', data);
    TasmotaApiService.deviceConfig[data.device] = Object.assign(TasmotaApiService.deviceConfig[data.device], data.config);
  }

  private onDeviceCommandResultHandler(data: { device: string, result: any }): void {
    console.log('onDeviceCommandResult', data);
    if (TasmotaApiService.devices) {
      const index = TasmotaApiService.devices.findIndex(d => d.id === data.device);
      if (index < 0) {
        return;
      }
      TasmotaApiService.devices[index].state = Object.assign(TasmotaApiService.devices[index].state || {}, data.result);
      this.deviceStateChange.emit(TasmotaApiService.devices[index]);
    }
  }

  public async getHouses(): Promise<House[]> {
    const url = `${SERVER_URL}/houses`;
    const response = await this.httpClient.get<{ houses: House[] }>(url)
      .toPromise<{ houses: House[] }>();
    return response.houses || [];
  }

  public async createHouse(house: House): Promise<{ id: string }> {
    const url = `${SERVER_URL}/houses`;
    const body = { house };
    return this.httpClient.post<{ id: string }>(url, body)
      .toPromise<{ id: string }>();
  }

  public async updateHouse(id: string, house: House): Promise<void> {
    const url = `${SERVER_URL}/houses/${id}`;
    const body = { house };
    return this.httpClient.put<void>(url, body)
      .toPromise<void>();
  }

  public async removeHouse(id: string): Promise<void> {
    const url = `${SERVER_URL}/houses/${id}`;
    return this.httpClient.delete<void>(url)
      .toPromise<void>();
  }

  public async getHouseRooms(id: string): Promise<Room[]> {
    const url = `${SERVER_URL}/houses/${id}/rooms`;
    const response = await this.httpClient.get<{ rooms: Room[] }>(url)
      .toPromise<{ rooms: Room[] }>();
    return response.rooms || [];
  }

  public async createHouseRoom(house: string, room: Room): Promise<{ id: string, house: string }> {
    const url = `${SERVER_URL}/houses/${house}/rooms`;
    const body = { room };
    return this.httpClient.post<{ id: string, house: string }>(url, body)
      .toPromise<{ id: string, house: string }>();
  }

  public async updateHouseRoom(house: string, id: string, room: Room): Promise<void> {
    const url = `${SERVER_URL}/houses/${house}/rooms/${id}`;
    const body = { room };
    return this.httpClient.put<void>(url, body)
      .toPromise<void>();
  }

  public async removeHouseRoom(house: string, room: string): Promise<void> {
    const url = `${SERVER_URL}/houses/${house}/rooms/${room}`;
    return this.httpClient.delete<void>(url)
      .toPromise<void>();
  }

  public async setHouseRoomDevices(house: string, room: string, devices: RoomDevice[]): Promise<void> {
    const url = `${SERVER_URL}/houses/${house}/rooms/${room}/devices`;
    const body = { devices };
    return this.httpClient.put<void>(url, body)
      .toPromise<void>();
  }

  public async getDevices(force?: boolean): Promise<Device[]> {
    if (force || TasmotaApiService.devices === undefined || TasmotaApiService.devices.length === 0) {
      const url = `${SERVER_URL}/devices`;
      const response = await this.httpClient.get<{ devices: Device[] }>(url)
        .toPromise<{ devices: Device[] }>();
      TasmotaApiService.devices = response.devices || [];
    }
    return TasmotaApiService.devices;
  }

  public async getDeviceConfig(id: string, force?: boolean): Promise<DeviceConfig> {
    if (force || TasmotaApiService.deviceConfig[id] === undefined || TasmotaApiService.deviceConfig[id] === {}) {
      const url = `${SERVER_URL}/devices/${id}/config`;
      const response = await this.httpClient.get<{ deviceConfig: DeviceConfig }>(url)
        .toPromise<{ deviceConfig: DeviceConfig }>();
      TasmotaApiService.deviceConfig[id] = response.deviceConfig || {};
    }
    return TasmotaApiService.deviceConfig[id];
  }

  public async sendCommandDevice(id: string, command: Command): Promise<void> {
    const url = `${SERVER_URL}/devices/${id}/cmnd`;
    const body = { command };
    return this.httpClient.post<void>(url, body)
      .toPromise<void>();
  }

  public onDeviceStateChange(next: (device: Device) => void): void {
    this.deviceStateChange.subscribe(next);
  }

}
