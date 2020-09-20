import { Component, OnInit } from '@angular/core';
import { PowerStateWidgetOptions } from '../power-state/power-state.component';
import { WidgetOptions } from '../widget';

interface IndexSelectedData {
  index: string;
  selected: boolean;
}

@Component({
  selector: 'app-power-state-options',
  templateUrl: './power-state-options.component.html',
  styleUrls: ['./power-state-options.component.scss'],
})
export class PowerStateOptionsComponent implements WidgetOptions, OnInit {

  indexes?: string[];

  private selectedIndexes: IndexSelectedData[];

  constructor() {
    this.indexes = [];
    this.selectedIndexes = [{
      selected: true,
      index: '0'
    }, {
      selected: false,
      index: '1'
    }, {
      selected: false,
      index: '2'
    }, {
      selected: false,
      index: '3'
    }, {
      selected: false,
      index: '4'
    }];
    this.selectedIndexes.forEach(i => this.indexSelected(i));
  }

  ngOnInit() {}

  getOptions(): PowerStateWidgetOptions {
    return {
      indexes: this.indexes
    };
  }

  setOptions(options: PowerStateWidgetOptions): void {
    this.indexes = options.indexes || [];

    this.selectedIndexes.forEach((selectedIndex: IndexSelectedData) => {
      const i = this.indexes.findIndex(j => j === selectedIndex.index);
      selectedIndex.selected = i >= 0;
    });
    this.indexes.forEach((index: string) => {
      const i = this.selectedIndexes.findIndex(j => j.index === index);
      if (i < 0) {
        this.selectedIndexes.push({ index, selected: true });
      }
    });
  }

  indexSelected(item: IndexSelectedData): void {
    if (item.selected) {
      const i = this.indexes.findIndex(s => s === item.index);
      if (i < 0) {
        const j = this.indexes.push(item.index);
      }
      return;
    }
    const k = this.indexes.findIndex(s => s === item.index);
    if (k >= 0) {
      this.indexes.splice(k , 1);
    }
  }

}
