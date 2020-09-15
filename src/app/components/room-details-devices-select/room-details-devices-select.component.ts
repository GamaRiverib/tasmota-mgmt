import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { RoomDevice } from 'src/app/models/room';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-room-details-devices-select',
  templateUrl: './room-details-devices-select.component.html',
  styleUrls: ['./room-details-devices-select.component.scss'],
})
export class RoomDetailsDevicesSelectComponent implements OnInit {

  @Input() house: string;
  @Input() room: string;
  @Input() selected: RoomDevice[];
  devices: Device[];

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController) {
    this.devices = [];
  }

  async ngOnInit(): Promise<void> {
    this.devices = await this.api.getDevices();
    this.devices.forEach(d => {
      const index = this.selected.findIndex(s => s.id === d.id);
      d.selected = index >= 0;
    });
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  async save(): Promise<void> {
    this.selected = this.devices
      .filter(d => d.selected)
      .map(d => {
        return {
          id: d.id,
          DeviceName: d.DeviceName
        };
    });
    try {
      await this.api.setHouseRoomDevices(this.house, this.room, this.selected);
      this.modalController.dismiss({ selected: this.selected }, 'selected');
    } catch (error) {
      console.log('ERROR trying to set house room devices', error);
      // TODO: show error
    }
  }

}
