import { Component, OnInit } from '@angular/core';
import { WidgetOptions } from '../widget';

@Component({
  selector: 'app-power-state-options',
  templateUrl: './power-state-options.component.html',
  styleUrls: ['./power-state-options.component.scss'],
})
export class PowerStateOptionsComponent implements WidgetOptions, OnInit {

  constructor() { }

  ngOnInit() {}

  getOptions(): any {
    return {};
  }

}
