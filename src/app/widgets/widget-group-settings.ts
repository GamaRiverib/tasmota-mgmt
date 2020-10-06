import { DeviceWidgetSettings } from './device-widget-settings';

export interface WidgetGroupSettings {
  general: { [id: string]: any };
  widgets: DeviceWidgetSettings[];
}
