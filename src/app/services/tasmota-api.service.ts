import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { House } from '../models/house';
import { Room, RoomDevice } from '../models/room';
import { Device } from '../models/device';
import { DeviceConfig } from '../models/device-config';
import { Command } from '../models/command';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasmotaApiService {

  constructor(private httpClient: HttpClient) { }

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

  public async getDevices(): Promise<Device[]> {
    const url = `${SERVER_URL}/devices`;
    const response = await this.httpClient.get<{ devices: Device[] }>(url)
      .toPromise<{ devices: Device[] }>();
    return response.devices || [];
  }

  public async getDeviceConfig(id: string): Promise<DeviceConfig> {
    const url = `${SERVER_URL}/devices/${id}/config`;
    const response = await this.httpClient.get<{ deviceConfig: DeviceConfig }>(url)
      .toPromise<{ deviceConfig: DeviceConfig }>();
    return response.deviceConfig || {};
  }

  public async sendCommandDevice(id: string, command: Command): Promise<void> {
    const url = `${SERVER_URL}/devices/${id}/cmnd`;
    const body = { command };
    return this.httpClient.post<void>(url, body)
      .toPromise<void>();
  }

}
