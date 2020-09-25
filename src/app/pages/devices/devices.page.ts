import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

const LOGIN_PAGE_PATH = 'login';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  @Input() devices: Device[];

  constructor(private api: TasmotaApiService, private router: Router) {
    this.devices = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.devices = await this.api.getDevices();
    } catch (reason) {
      console.log(reason);
      if (reason instanceof HttpErrorResponse) {
        if (reason.status === 401) {
          this.router.navigate([ LOGIN_PAGE_PATH ]);
        }
      }
    }
  }

  async doRefresh(ev: any): Promise<void> {
    let timeout: any;
    try {
      timeout = setTimeout(ev.target.complete, 3000);
      this.devices = await this.api.getDevices(true);
      clearTimeout(timeout);
      ev.target.complete();
    } catch (reason) {
      clearTimeout(timeout);
      ev.target.complete();
      if (reason instanceof HttpErrorResponse) {
        if (reason.status === 401) {
          this.router.navigate([ LOGIN_PAGE_PATH ]);
        }
      }
    }
  }

}
