import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  @Input() devices: Device[];

  constructor(private api: TasmotaApiService) {
    this.devices = [];
  }

  async ngOnInit(): Promise<void> {
    this.devices = await this.api.getDevices();
  }

}
