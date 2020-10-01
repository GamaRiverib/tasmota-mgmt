import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { DeviceConfig } from 'src/app/models/device-config';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Widget } from '../widget';

export interface Dht11RowWidgetOptions {
  showLastUpdate: boolean;
}

@Component({
  selector: 'app-dht11-row',
  templateUrl: './dht11-row.component.html',
  styleUrls: ['./dht11-row.component.scss'],
})
export class Dht11RowComponent implements Widget, OnInit {

  @Input() api: TasmotaApiService;
  @Input() device: Device;
  @Input() options: Dht11RowWidgetOptions;

  temperature: string;
  tempUnit: string;
  humidity: string;

  lastUpdate: Date;

  constructor() { }

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

  updateView(device: Device): void {
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
