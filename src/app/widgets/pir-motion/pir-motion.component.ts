import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Widget } from '../widget';

export interface PirMotionWidgetOptions {
  stateOnPower: boolean;
  indexes?: string[];
  names?: string[];
}

interface SensorData {
  online: boolean;
  index: string;
  name: string;
  on: boolean;
}

@Component({
  selector: 'app-pir-motion',
  templateUrl: './pir-motion.component.html',
  styleUrls: ['./pir-motion.component.scss'],
})
export class PirMotionComponent implements Widget, OnInit {

  @Input() api: TasmotaApiService;
  @Input() device: Device;
  @Input() options: PirMotionWidgetOptions;

  sensors: SensorData[];

  constructor() { }

  ngOnInit() {
    this.updateView(this.device);
  }

  updateView(device: Device): void {
    if (!this.device || !this.device.state) {
      return;
    }

    if (device.id === this.device.id) {
      this.sensors = [];
      const online = this.device.online || false;
      const indexes = this.options && this.options.indexes ? this.options.indexes : ['0', '1', '2', '3', '4'];
      const names = this.options && this.options.names ? this.options.names : [undefined, undefined, undefined, undefined, undefined];
      indexes.forEach((i: string, j: number) => {
        const index = i === '0' ? '' : i;
        const name = names[j] || `PIR ${j + 1}`;
        let on = false;
        const stateOnPower = this.options ? this.options.stateOnPower : false;
        let pirState: string;
        if (stateOnPower) {
          pirState = this.device.state[`POWER${index}`] || '';
        } else {
          pirState = this.device.sensor[`Switch${index}`] || '';
        }
        on = pirState.toUpperCase() === 'ON' || pirState === '1' || pirState.toUpperCase() === 'TRUE';
        this.sensors.push({ online, index, name, on });
      });
    }
  }

}
