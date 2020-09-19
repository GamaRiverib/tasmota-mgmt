import { Component, OnInit } from '@angular/core';
import { WidgetOptions } from '../widget';

@Component({
  selector: 'app-pir-motion-options',
  templateUrl: './pir-motion-options.component.html',
  styleUrls: ['./pir-motion-options.component.scss'],
})
export class PirMotionOptionsComponent implements WidgetOptions, OnInit {

  constructor() { }

  ngOnInit() {}

  getOptions(): any {
    return {};
  }

}
