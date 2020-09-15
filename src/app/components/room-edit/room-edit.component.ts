import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Room } from 'src/app/models/room';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { SelectDevicesComponent } from '../select-devices/select-devices.component';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
})
export class RoomEditComponent implements OnInit {

  @Input() house: string;
  @Input() room: Room | null;

  edit = true;
  role: string | undefined = undefined;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
    if (this.room === null) {
      this.edit = false;
      this.room = { id: '', name: '', description: '' };
    }
  }

  dismiss() {
    if (this.role) {
      this.modalController.dismiss({ room: this.room }, this.role);
    } else {
      this.modalController.dismiss({ dismissed: true });
    }
  }

  async remove(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Remove room',
      message: `Are you sure?<br/>Remove room <strong>${this.room.name}</strong>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Remove',
          cssClass: 'primary',
          handler: async () => {
            try {
              await this.api.removeHouseRoom(this.house, this.room.id);
              this.role = 'removed';
              this.dismiss();
            } catch (error) {
              console.log('ERROR trying to remove room', error);
              // TODO
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async save(): Promise<void> {
    try {
      if (this.edit && this.room.id) {
        await this.api.updateHouseRoom(this.house, this.room.id, this.room);
        this.role = 'updated';
      } else {
        const { house, id } = await this.api.createHouseRoom(this.house, this.room);
        if (house !== this.house) {
          // TODO: throw error
        }
        this.room.id = id;
        this.edit = true;
        this.role = 'added';
      }
    } catch (error) {
      // TODO: show error
    }
  }

  async selectDevices(): Promise<void> {
    const selected = this.room.devices || [];
    const modal = await this.modalController.create({
      component: SelectDevicesComponent,
      componentProps: {
        house: this.house,
        room: this.room.id,
        selected }
    });
    modal.onWillDismiss().then(async (res: any) => {
      console.log('onWillDismiss', res);
      if (res.role === 'selected' && res.data.selected) {
        this.room.devices = res.data.selected;
      }
    });
    return await modal.present();
  }

}
