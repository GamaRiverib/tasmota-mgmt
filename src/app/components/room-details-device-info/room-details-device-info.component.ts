import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-room-details-device-info',
  templateUrl: './room-details-device-info.component.html',
  styleUrls: ['./room-details-device-info.component.scss'],
})
export class RoomDetailsDeviceInfoComponent implements OnInit {

  @Input() id: string;
  device: Device;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController) {
      this.device = {
        id: '',
        DeviceName: '',
        FriendlyName: []
      };
    }

  async ngOnInit(): Promise<void> {
    const devices = await this.api.getDevices();
    this.device = devices.find(d => d.id === this.id);
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  isObject(data: any): boolean {
    return typeof data === 'object';
  }

}
