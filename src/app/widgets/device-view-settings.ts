import { WidgetSettings } from './widget-settings';

export interface DeviceViewSettings {
  general: { [id: string]: any };
  widgets: WidgetSettings[];
}
