import { Type } from '@angular/core';
import { Layout } from './layout';
import { TwoColsGridComponent } from './two-cols-grid/two-cols-grid.component';

const LAYOUT_LIST: { [id: string]: Type<Layout> } = {
  TwoColsGridComponent
};

const LAYOUT_FRIENDLY_NAME_LIST: { [id: string]: string } = {
  TwoColsGridComponent: 'Grid 2 cols'
};

export function getLayoutComponent(name: string): Type<Layout> {
  return LAYOUT_LIST[name] || TwoColsGridComponent;
}

export function getLayoutNames(): { name: string, value: string }[] {
  const list: { name: string, value: string }[] = [];
  // tslint:disable-next-line: forin
  for (const k in LAYOUT_FRIENDLY_NAME_LIST) {
    list.push({
      value: k,
      name: LAYOUT_FRIENDLY_NAME_LIST[k]
    });
  }
  return list;
}
