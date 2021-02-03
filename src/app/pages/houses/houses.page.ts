import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.page.html',
  styleUrls: ['./houses.page.scss'],
})
export class HousesPage implements OnInit {

  houses: House[];

  constructor(private api: TasmotaApiService) {
    this.houses = [];
  }

  async ngOnInit() {
    try {
      this.houses = await this.api.getHouses();
    } catch (error) {
      console.log(error);
    }
  }

}
