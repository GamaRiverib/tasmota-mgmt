import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { House } from 'src/app/models/house';
import { HouseEditComponent } from '../house-edit/house-edit.component';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss'],
})
export class HouseListComponent implements OnInit {

  @Input() houses: House[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public async addHouse(): Promise<void> {
    const modal = await this.modalController.create({
      component: HouseEditComponent,
      componentProps: { house: null }
    });
    modal.onWillDismiss().then(async (res: any) => {
      console.log('onWillDismiss', res);
      if (res.role === 'added' && res.data.house) {
        this.houses.unshift(res.data.house);
      }
    });
    return await modal.present();
  }

  public async editHouse(house: House): Promise<void> {
    const modal = await this.modalController.create({
      component: HouseEditComponent,
      componentProps: { house }
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
          if (res.data.house) {
            if (!this.houses) {
              this.houses = [];
            }
            const index = this.houses.findIndex(h => h.id === res.data.house.id);
            if (index >= 0) {
              this.houses.splice(index, 1);
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
