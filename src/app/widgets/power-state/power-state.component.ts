import { Component, Input, OnInit } from '@angular/core';
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

class PowerDataImpl implements PowerData {

  index: string;
  state: string;

  constructor(private device: Device, index: string) {
    this.index = index === '0' ? '' : index;
    this.state = this.device.state[`POWER${this.index}`];
  }

  get topic(): string {
    return `POWER${this.index}`;
  }

  get name(): string {
    let name = `POWER${this.index}`;
    if (this.device.FriendlyName) {
      let j = 0;
      if (this.index !== '') {
        j = parseInt(this.index, 10) - 1;
      }
      if (j >= 0 && j < this.device.FriendlyName.length) {
        name = this.device.FriendlyName[j] || name;
      }
    }
    return name;
  }

  get on(): boolean {
    return this.state.toUpperCase() === 'ON' || this.state === '1' || this.state.toUpperCase() === 'TRUE';
  }

  get switch(): boolean {
    let sw = this.on;
    if (this.device.sensor && this.device.sensor[`Switch${this.index}`]) {
      const swState: string = this.device.sensor[`Switch${this.index}`];
      sw = swState.toUpperCase() === 'ON' || swState === '1' || swState.toUpperCase() === 'TRUE';
    }
    return sw;
  }
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
    if (!this.device || !this.device.state) {
      return;
    }
    this.powerList = [];
    const indexes = this.options && this.options.indexes ? this.options.indexes : ['', '1', '2', '3', '4'];
    indexes.forEach(index => {
      const i = index === '0' ? '' : index;
      if (this.device.state[`POWER${i}`]) {
       this.powerList.push(new PowerDataImpl(this.device, i));
      }
    });
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
