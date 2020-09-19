import { Type } from '@angular/core';
import { Dht11OptionsComponent } from './dht11-options/dht11-options.component';
import { Dht11Component } from './dht11/dht11.component';
import { PirMotionOptionsComponent } from './pir-motion-options/pir-motion-options.component';
import { PirMotionComponent } from './pir-motion/pir-motion.component';
import { PowerStateComponent } from './power-state/power-state.component';
import { PowerStateOptionsComponent } from './power-state-options/power-state-options.component';
import { Widget, WidgetOptions } from './widget';

const WIDGET_LIST: { [id: string]: Type<Widget> } = {
  Dht11Component,
  PirMotionComponent,
  PowerStateComponent
};

const WIDGET_OPTIONS_LIST: { [id: string]: Type<WidgetOptions> } = {
  Dht11OptionsComponent,
  PirMotionOptionsComponent,
  PowerStateOptionsComponent
};

export function getWidgetComponent(name: string): Type<Widget> {
  return WIDGET_LIST[name] || PowerStateComponent;
}

export function getWidgetOptionsComponent(name: string): Type<WidgetOptions> {
  const optionsName = name.replace('Component', 'OptionsComponent');
  return WIDGET_OPTIONS_LIST[optionsName];
}

export function getWidgetNames(): string[] {
  const list = [];
  // tslint:disable-next-line: forin
  for (const k in WIDGET_LIST) { list.push(k); }
  return list;
}
