export interface RoomDevice {
    id: string;
    DeviceName?: string;
}

export class Room {
    id: string;
    name: string;
    description?: string;
    devices?: RoomDevice[];
}
