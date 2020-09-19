import { Component, OnInit } from '@angular/core';
import { Dht11WidgetOptions } from '../dht11/dht11.component';
import { WidgetOptions } from '../widget';

@Component({
  selector: 'app-dht11-options',
  templateUrl: './dht11-options.component.html',
  styleUrls: ['./dht11-options.component.scss'],
})
export class Dht11OptionsComponent implements WidgetOptions, OnInit {

  twoCards: boolean;
  showLastUpdate: boolean;

  constructor() {
    this.twoCards = false;
    this.showLastUpdate = false;
  }

  ngOnInit() {}

  getOptions(): Dht11WidgetOptions {
    return {
      twoCards: this.twoCards,
      showLastUpdate: this.showLastUpdate
    };
  }

}
