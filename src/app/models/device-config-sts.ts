import { DeviceConfigWifi } from './device-config-wifi';

export class DeviceStatusSTS {
    Time: string;
    Uptime: string;
    UptimeSec: number;
    Heap: number;
    SleepMode: string;
    Sleep: number;
    LoadAvg: number;
    MqttCount: number;
    POWER?: string;
    POWER1?: string;
    POWER2?: string;
    POWER3?: string;
    POWER4?: string;
    Wifi: DeviceConfigWifi;
}
