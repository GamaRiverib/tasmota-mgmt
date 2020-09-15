import { Room } from './room';

export class House {
    id: string;
    name: string;
    default?: boolean;
    description?: string;
    rooms?: Room[];
}
