import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { createPowerData, PowerData } from '../power-data';
import { Widget } from '../widget';

export interface SinglePowerDriverOptions {
  index: string;
  roomName: string;
}

@Component({
  selector: 'app-single-power-driver',
  templateUrl: './single-power-driver.component.html',
  styleUrls: ['./single-power-driver.component.scss'],
})
export class SinglePowerDriverComponent implements Widget, OnInit {

  @Input() api: TasmotaApiService;
  @Input() device: Device;
  @Input() options: SinglePowerDriverOptions;

  power: PowerData;

  constructor() { }

  ngOnInit() {
    this.updateView(this.device);
  }

  updateView(device: Device): void {
    if (!device || !device.state) {
      return;
    }

    if (device.id === this.device.id) {
      const i = this.options.index;
      if (device.state[`POWER${i}`]) {
        this.power = createPowerData(device, i);
      }
    }
  }

  async toggle(): Promise<void> {
    if (!this.api || !this.device) {
      return;
    }
    const id = this.device.id;
    const command: Command = {
      command: this.power.topic,
      parameters: 'Toggle'
    };
    this.api.sendCommandDevice(id, command);
  }

}
