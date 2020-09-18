import { Device } from '../models/device';
import { TasmotaApiService } from '../services/tasmota-api.service';

export interface Widget {
    api: TasmotaApiService;
    device: Device;
    options: any;

    updateView(device: Device): void;
}
