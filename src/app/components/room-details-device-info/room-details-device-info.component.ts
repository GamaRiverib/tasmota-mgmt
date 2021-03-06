import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { AttributesViewerComponent } from '../attributes-viewer/attributes-viewer.component';

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

  async viewAttribute(item: { key: string, value: any }): Promise<void> {
    if (this.isObject(item.value)) {
      const props = {
        title: this.device.DeviceName || this.device.id,
        key: item.key,
        value: item.value
      };
      const modal = await this.modalController.create({
        component: AttributesViewerComponent,
        componentProps: props
      });
      return await modal.present();
    }
  }

}
