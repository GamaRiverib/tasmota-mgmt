import { Type } from '@angular/core';
import { Dht11OptionsComponent } from './dht11-options/dht11-options.component';
import { Dht11Component } from './dht11/dht11.component';
import { Dht11RowComponent } from './dht11-row/dht11-row.component';
import { Dht11RowOptionsComponent } from './dht11-row-options/dht11-row-options.component';
import { PirMotionOptionsComponent } from './pir-motion-options/pir-motion-options.component';
import { PirMotionComponent } from './pir-motion/pir-motion.component';
import { PowerStateComponent } from './power-state/power-state.component';
import { PowerStateOptionsComponent } from './power-state-options/power-state-options.component';
import { SinglePowerDriverComponent } from './single-power-driver/single-power-driver.component';
import { SinglePowerDriverOptionsComponent } from './single-power-driver-options/single-power-driver-options.component';
import { Widget, WidgetOptions } from './widget';

const WIDGET_LIST: { [id: string]: Type<Widget> } = {
  Dht11Component,
  Dht11RowComponent,
  PirMotionComponent,
  PowerStateComponent,
  SinglePowerDriverComponent
};

const WIDGET_FRIENDLY_NAME_LIST: { [id: string]: string } = {
  Dht11Component: 'DHT11 (cards)',
  Dht11RowComponent: 'DHT11',
  PirMotionComponent: 'PIR Sensor',
  PowerStateComponent: 'Power drivers',
  SinglePowerDriverComponent: 'Single power driver'
};

const WIDGET_OPTIONS_LIST: { [id: string]: Type<WidgetOptions> } = {
  Dht11OptionsComponent,
  Dht11RowOptionsComponent,
  PirMotionOptionsComponent,
  PowerStateOptionsComponent,
  SinglePowerDriverOptionsComponent
};

export function getWidgetComponent(name: string): Type<Widget> {
  return WIDGET_LIST[name] || PowerStateComponent;
}

export function getWidgetOptionsComponent(name: string): Type<WidgetOptions> {
  const optionsName = name.replace('Component', 'OptionsComponent');
  return WIDGET_OPTIONS_LIST[optionsName];
}

export function getWidgetNames(): { name: string, value: string }[] {
  const list: { name: string, value: string }[] = [];
  // tslint:disable-next-line: forin
  for (const k in WIDGET_FRIENDLY_NAME_LIST) {
    list.push({
      value: k,
      name: WIDGET_FRIENDLY_NAME_LIST[k]
    });
  }
  return list;
}
