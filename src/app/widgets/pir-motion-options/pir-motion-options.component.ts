import { Component, OnInit } from '@angular/core';
import { PirMotionWidgetOptions } from '../pir-motion/pir-motion.component';
import { WidgetOptions } from '../widget';

interface IndexSelectedData {
  index: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-pir-motion-options',
  templateUrl: './pir-motion-options.component.html',
  styleUrls: ['./pir-motion-options.component.scss'],
})
export class PirMotionOptionsComponent implements WidgetOptions, OnInit {

  stateOnPower: boolean;
  indexes?: string[];
  names?: string[];
  private selectedIndexes: IndexSelectedData[];

  constructor() {
    this.stateOnPower = true;
    this.indexes = [];
    this.names = [];
    this.selectedIndexes = [{
      selected: true,
      index: '',
      name: 'PIR'
    }, {
      selected: false,
      index: '1',
      name: 'PIR 1'
    }, {
      selected: false,
      index: '2',
      name: 'PIR 2'
    }, {
      selected: false,
      index: '3',
      name: 'PIR 3'
    }, {
      selected: false,
      index: '4',
      name: 'PIR 4'
    }];
    this.selectedIndexes.forEach(i => this.indexSelected(i));
  }

  ngOnInit() {}

  getOptions(): PirMotionWidgetOptions {
    return {
      stateOnPower: this.stateOnPower,
      indexes: this.indexes,
      names: this.names
    };
  }

  indexSelected(item: IndexSelectedData): void {
    if (item.selected) {
      const i = this.indexes.findIndex(s => s === item.index);
      if (i < 0) {
        const j = this.indexes.push(item.index);
        this.names[j - 1] = item.name;
      } else {
        this.names[i] = item.name;
      }
      return;
    }
    const k = this.indexes.findIndex(s => s === item.index);
    if (k >= 0) {
      this.indexes.splice(k , 1);
      this.names.splice(k, 1);
    }
  }

}
