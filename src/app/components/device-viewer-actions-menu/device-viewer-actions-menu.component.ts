import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { DeviceViewerConfigurationComponent } from '../device-viewer-configuration/device-viewer-configuration.component';
import { DeviceViewerFirmwareUpgradeComponent } from '../device-viewer-firmware-upgrade/device-viewer-firmware-upgrade.component';
import { DeviceViewerInformationComponent } from '../device-viewer-information/device-viewer-information.component';
import { DeviceViewerWidgetsComponent } from '../device-viewer-widgets/device-viewer-widgets.component';

@Component({
  selector: 'app-device-viewer-actions-menu',
  templateUrl: './device-viewer-actions-menu.component.html',
  styleUrls: ['./device-viewer-actions-menu.component.scss'],
})
export class DeviceViewerActionsMenuComponent implements OnInit {

  @Input() device: Device;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController,
    private alertController: AlertController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  dismissPopover(option: string, data?: any) {
    this.popoverController.dismiss(data || {}, option);
  }

  async actionWidgetsHandler() {
    const name = this.device.DeviceName || this.device.id;
    const deviceId = this.device.id;
    const modal = await this.modalController.create({
      component: DeviceViewerWidgetsComponent,
      componentProps: { name, deviceId }
    });
    modal.onWillDismiss().then(async (res: any) => {
      this.dismissPopover('widgets');
    });
    return modal.present();
  }

  async actionInformationHandler() {
    const deviceId = this.device.id;
    const modal = await this.modalController.create({
      component: DeviceViewerInformationComponent,
      componentProps: { deviceId }
    });
    modal.onWillDismiss().then(async (res: any) => {
      this.dismissPopover('information');
    });
    return modal.present();
  }

  async actionConfigurationHandler() {
    this.popoverController.dismiss();
    const deviceId = this.device.id;
    const modal = await this.modalController.create({
      component: DeviceViewerConfigurationComponent,
      componentProps: { deviceId }
    });
    modal.onWillDismiss().then(async (res: any) => {
      this.dismissPopover('configuration');
    });
    return modal.present();
  }

  async actionFirmwareUpgradeHandler() {
    this.popoverController.dismiss();
    const deviceId = this.device.id;
    const modal = await this.modalController.create({
      component: DeviceViewerFirmwareUpgradeComponent,
      componentProps: { deviceId }
    });
    modal.onWillDismiss().then(async (res: any) => {
      this.dismissPopover('firmwareUpgrade');
    });
    return modal.present();
  }

  async actionRestartHandler() {
    const alert = await this.alertController.create({
      header: 'Restart',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Restart canceled');
          }
        }, {
          text: 'Restart',
          handler: async () => {
            console.log('Restart');
            const command: Command = {
              command: 'Restart',
              parameters: '1'
            };
            await this.api.sendCommandDevice(this.device.id, command);
          }
        }
      ]
    });
    this.dismissPopover('restart');
    await alert.present();
  }

}
