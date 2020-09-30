import { Component, OnInit } from '@angular/core';
import { WidgetOptions } from '../widget';

@Component({
  selector: 'app-dht11-row-options',
  templateUrl: './dht11-row-options.component.html',
  styleUrls: ['./dht11-row-options.component.scss'],
})
export class Dht11RowOptionsComponent implements WidgetOptions, OnInit {

  showLastUpdate: boolean;

  constructor() {
    this.showLastUpdate = false;
  }

  ngOnInit() {}

  getOptions() {
    return {
      showLastUpdate: this.showLastUpdate
    };
  }
  setOptions(options: Dht11RowOptionsComponent): void {
    this.showLastUpdate = options.showLastUpdate;
  }

}
