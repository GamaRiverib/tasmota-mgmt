import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Widget } from '../widget';

export interface PowerStateWidgetOptions {
  indexes?: string[];
}

interface PowerData {
  topic: string;
  name: string;
  state: string;
  on: boolean;
  index: string;
  switch: boolean;
}

@Component({
  selector: 'app-power-state',
  templateUrl: './power-state.component.html',
  styleUrls: ['./power-state.component.scss'],
})
export class PowerStateComponent implements Widget, OnInit {

  private powerList: PowerData[];
  private api: TasmotaApiService;
  private device: Device;
  private options: PowerStateWidgetOptions;

  constructor() {
    this.powerList = [];
  }

  ngOnInit() {
  }

  private updateView(): void {
    if (!this.device || !this.device.state) {
      return;
    }
    const indexes = this.options && this.options.indexes ? this.options.indexes : ['', '1', '2', '3', '4'];
    indexes.forEach(i => {
      if (this.device.state[`POWER${i}`]) {
        const topic = `POWER${i}`;
        let name = `POWER${i}`;
        if (this.device.FriendlyName) {
          let j = 0;
          if (i !== '') {
            j = parseInt(i, 10) - 1;
          }
          if (j >= 0 && j < this.device.FriendlyName.length) {
            name = this.device.FriendlyName[j] || name;
          }
        }
        const state: string = this.device.state[`POWER${i}`];
        const on = state.toUpperCase() === 'ON' || state === '1';
        let sw = on;
        if (this.device.sensor && this.device.sensor[`Switch${i}`]) {
          const swState: string = this.device.sensor[`Switch${i}`];
          sw = swState.toUpperCase() === 'ON' || swState === '1';
        }
        const index = i;
        this.powerList.push({ index, name, on, state, topic, switch: sw });
      }
    });
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
