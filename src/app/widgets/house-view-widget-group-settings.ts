import { HouseWidgetSettings } from './house-widget-settings';

export interface HouseViewWidgetGroupSettings {
    house: string;
    view: string;
    layout: string;
    widgets: HouseWidgetSettings[];
}
