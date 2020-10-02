import { Component, OnInit } from '@angular/core';
import { SinglePowerDriverOptions } from '../single-power-driver/single-power-driver.component';
import { WidgetOptions } from '../widget';

@Component({
  selector: 'app-single-power-driver-options',
  templateUrl: './single-power-driver-options.component.html',
  styleUrls: ['./single-power-driver-options.component.scss'],
})
export class SinglePowerDriverOptionsComponent implements WidgetOptions, OnInit {

  options: SinglePowerDriverOptions;

  constructor() { }

  ngOnInit() {}

  getOptions(): SinglePowerDriverOptions {
    return this.options;
  }
  setOptions(options: SinglePowerDriverOptions): void {
    this.options = options;
  }

}
