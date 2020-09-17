import { Device } from '../models/device';
import { TasmotaApiService } from '../services/tasmota-api.service';

export interface Widget {
    setApi(api: TasmotaApiService): void;
    setDevice(device: Device): void;
    setOptions(options: any): void;
}
