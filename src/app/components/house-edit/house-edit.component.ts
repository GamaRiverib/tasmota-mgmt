import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { House } from 'src/app/models/house';
import { Room } from 'src/app/models/room';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { RoomEditComponent } from '../room-edit/room-edit.component';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss'],
})
export class HouseEditComponent implements OnInit {

  @Input() house: House | null;

  edit = true;
  role: string | undefined = undefined;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
    if (this.house === null) {
      this.edit = false;
      this.house = { id: '', name: '', description: '' };
    }
  }

  dismiss() {
    if (this.role) {
      this.modalController.dismiss({ house: this.house }, this.role);
    } else {
      this.modalController.dismiss({ dismissed: true });
    }
  }

  async remove(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Remove house',
      message: `Are you sure?<br/>Remove house <strong>${this.house.name}</strong>`,
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
              await this.api.removeHouse(this.house.id);
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
      if (this.edit && this.house.id) {
        await this.api.updateHouse(this.house.id, this.house);
        this.role = 'updated';
      } else {
        const { id } = await this.api.createHouse(this.house);
        this.house.id = id;
        this.edit = true;
        this.role = 'added';
      }
    } catch (error) {
      // TODO: show error
    }
  }

  async addRoom(): Promise<void> {
    const modal = await this.modalController.create({
      component: RoomEditComponent,
      componentProps: { house: this.house.id, room: null }
    });
    modal.onWillDismiss().then(async (res: any) => {
      console.log('onWillDismiss', res);
      if (res.role === 'added' && res.data.room) {
        if (!this.house.rooms) {
          this.house.rooms = [];
        }
        this.house.rooms.unshift(res.data.room);
      }
    });
    return await modal.present();
  }

  async editRoom(room: Room): Promise<void> {
    const modal = await this.modalController.create({
      component: RoomEditComponent,
      componentProps: { house: this.house.id, room }
    });
    modal.onWillDismiss().then(async (res: any) => {
      try {
        if (res.role === 'updated') {
          /*const toast = await this.toastController.create({
            message: 'Successful updated',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();*/
        } else if (res.role === 'removed') {
          /*const toast = await this.toastController.create({
            message: 'Successful removed',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          if (res.data.device) {
            const index = this.all.findIndex(d => d.uuid === res.data.device.uuid);
            if (index >= 0) {
              this.all.splice(index, 1);
            }
          }*/
          if (res.data.room) {
            if (!this.house.rooms) {
              this.house.rooms = [];
            }
            const index = this.house.rooms.findIndex(r => r.id === res.data.room.id);
            if (index >= 0) {
              this.house.rooms.splice(index, 1);
            }
          }
        } else if (res.role === 'error') {
          /*const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Error updating',
            message: 'Something was wrong. Try again please.',
            buttons: ['OK']
          });
          await alert.present();*/
        }
      } catch (reason) {
        console.log(reason);
      }
    }).catch((reason: any) => {
      console.log('ERROR', reason);
    }).finally(() => {
      // TODO
    });
    return await modal.present();
  }

}
