import { Device } from '../models/device';

export interface PowerData {
  topic: string;
  name: string;
  state: string;
  on: boolean;
  index: string;
  switch: boolean;
}

export function createPowerData(device: Device, index: string): PowerData {
  return new PowerDataImpl(device, index);
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
