import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { createPowerData, PowerData } from '../power-data';
import { Widget } from '../widget';

export interface PowerStateWidgetOptions {
  indexes?: string[];
}

@Component({
  selector: 'app-power-state',
  templateUrl: './power-state.component.html',
  styleUrls: ['./power-state.component.scss'],
})
export class PowerStateComponent implements Widget, OnInit {

  @Input() api: TasmotaApiService;
  @Input() device: Device;
  @Input() options: PowerStateWidgetOptions;

  powerList: PowerData[];

  constructor() {

  }

  ngOnInit() {
    this.updateView(this.device);
  }

  public updateView(device: Device): void {
    if (!device || !device.state) {
      return;
    }

    if (device.id === this.device.id) {
      this.powerList = [];
      const indexes = this.options && this.options.indexes ? this.options.indexes : ['', '1', '2', '3', '4'];
      indexes.forEach(index => {
        const i = index === '0' ? '' : index;
        if (device.state[`POWER${i}`]) {
        this.powerList.push(createPowerData(device, i));
        }
      });
    }
  }

  async toggle(powerData: PowerData): Promise<void> {
    if (!this.api || !this.device) {
      return;
    }
    const id = this.device.id;
    const command: Command = {
      command: powerData.topic,
      parameters: 'Toggle'
    };
    return this.api.sendCommandDevice(id, command);
  }

}
