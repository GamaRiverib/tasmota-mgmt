export interface ANALOG {
    Illuminance?: number;
}
export interface DHT11 {
    Temperature?: number;
    Humidity?: number;
    DewPoint?: number;
}

export interface HasSwitch {
    Switch?: string | 'ON' | 'OFF';
    Switch1?: string | 'ON' | 'OFF';
    Switch2?: string | 'ON' | 'OFF';
    Switch3?: string | 'ON' | 'OFF';
    Switch4?: string | 'ON' | 'OFF';
}

export class DeviceStatusSNS implements HasSwitch {
    Time: string;
    [sensor: string]: any;
    ANALOG?: ANALOG;
    DHT11?: DHT11;
    TempUnit?: 'C' | 'F';
    Switch?: string | 'ON' | 'OFF';
    Switch1?: string | 'ON' | 'OFF';
    Switch2?: string | 'ON' | 'OFF';
    Switch3?: string | 'ON' | 'OFF';
    Switch4?: string | 'ON' | 'OFF';
}
