import { Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss'],
})
export class HouseListComponent implements OnInit {

  @Input() houses: House[];

  constructor() { }

  ngOnInit() {}

}
