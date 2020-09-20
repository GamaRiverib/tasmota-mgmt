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
      index: '0',
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

  setOptions(options: PirMotionWidgetOptions): void {
    this.stateOnPower = options.stateOnPower;
    this.indexes = options.indexes || [];
    this.names = options.names || [];

    this.selectedIndexes.forEach((selectedIndex: IndexSelectedData) => {
      const i = this.indexes.findIndex(j => j === selectedIndex.index);
      selectedIndex.selected = i >= 0;
    });
    this.indexes.forEach((index: string) => {
      const i = this.selectedIndexes.findIndex(j => j.index === index);
      if (i < 0) {
        this.selectedIndexes.push({ index, name: this.names[index] || `PIR ${index}`, selected: true });
      }
    });
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
