import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { DeviceConfig } from 'src/app/models/device-config';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Widget } from '../widget';

// tslint:disable-next-line: no-empty-interface
export interface Dht11WidgetOptions {
  twoCards: boolean;
  showLastUpdate: boolean;
}

@Component({
  selector: 'app-dht11',
  templateUrl: './dht11.component.html',
  styleUrls: ['./dht11.component.scss'],
})
export class Dht11Component implements Widget, OnInit {

  @Input() api: TasmotaApiService;
  @Input() device: Device;
  @Input() options: Dht11WidgetOptions;

  temperature: string;
  tempUnit: string;
  humidity: string;

  lastUpdate: Date;

  constructor() {
    if (this.options === undefined) {
      this.options = { twoCards: true, showLastUpdate: false };
    }
  }

  ngOnInit() {
    this.updateView(this.device);
    this.api.onDeviceConfigChange((data: {deviceId: string, config: DeviceConfig}) => {
      if (data.deviceId === this.device.id) {
        if (data.config.StatusSNS && data.config.StatusSNS.DHT11) {
          const dht11 = data.config.StatusSNS.DHT11;
          this.temperature = dht11.Temperature.toString();
          this.humidity = dht11.Humidity.toString();
          this.tempUnit = data.config.StatusSNS.TempUnit;
        }
      }
    });
  }

  public updateView(device: Device): void {
    if (!device || !device.sensor || !device.sensor.DHT11) {
      return;
    }

    this.temperature = device.sensor.DHT11.Temperature;
    this.tempUnit = device.sensor.TempUnit;
    this.humidity = device.sensor.DHT11.Humidity;

    const lastUpdate: Date = new Date(device.state.Time);
    this.lastUpdate = lastUpdate;
  }

  refresh(): void {
    const command: Command = {
      command: 'Status',
      parameters: '8'
    };
    this.api.sendCommandDevice(this.device.id, command);
  }

}
