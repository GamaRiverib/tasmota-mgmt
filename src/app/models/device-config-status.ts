export class DeviceStatus {
    Module: number;
    DeviceName: string;
    FriendlyName: string[];
    Topic: string;
    ButtonTopic: string;
    Power: number;
    PowerOnState: number;
    LedState: number;
    LedMask: string;
    SaveData: number;
    SaveState: number;
    SwitchTopic: string;
    SwitchMode: number[];
    ButtonRetain: number;
    SwitchRetain: number;
    SensorRetain: number;
    PowerRetain: number;
}
