import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Widget } from '../widget';

// tslint:disable-next-line: no-empty-interface
export interface Dht11WidgetOptions {
  twoCards: boolean;
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

  private temperature: string;
  private tempUnit: string;
  private humidity: string;

  constructor() {
    // TODO: test options
    if (this.options === undefined) {
      this.options = { twoCards: true };
    }
    this.options.twoCards = false;
  }

  ngOnInit() {
    this.updateView(this.device);
  }

  public updateView(device: Device): void {
    if (!this.device || !this.device.sensor || !this.device.sensor.DHT11) {
      return;
    }

    this.temperature = this.device.sensor.DHT11.Temperature;
    this.tempUnit = this.device.sensor.TempUnit;
    this.humidity = this.device.sensor.DHT11.Humidity;
  }

}
