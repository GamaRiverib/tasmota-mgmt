import { WidgetSettings } from './widget-settings';

export interface WidgetGroupSettings {
  general: { [id: string]: any };
  widgets: WidgetSettings[];
}
