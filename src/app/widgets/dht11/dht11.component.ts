import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Widget } from '../widget';

// tslint:disable-next-line: no-empty-interface
export interface Dht11WidgetOptions {

}

@Component({
  selector: 'app-dht11',
  templateUrl: './dht11.component.html',
  styleUrls: ['./dht11.component.scss'],
})
export class Dht11Component implements Widget, OnInit {

  private device: Device;
  private api: TasmotaApiService;
  private options: Dht11WidgetOptions;

  private temperature: string;
  private tempUnit: string;
  private humidity: string;

  constructor() { }

  ngOnInit() {}

  private updateView(): void {
    if (!this.device || !this.device.sensor || !this.device.sensor.DHT11) {
      return;
    }

    this.temperature = this.device.sensor.DHT11.Temperature;
    this.tempUnit = this.device.sensor.TempUnit;
    this.humidity = this.device.sensor.DHT11.Humidity;
  }

  setApi(api: TasmotaApiService): void {
    this.api = api;
  }
  setDevice(device: Device): void {
    this.device = device;
    this.updateView();
  }
  setOptions(options: any): void {
    this.options = options;
  }

}
