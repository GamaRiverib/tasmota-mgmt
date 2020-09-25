import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { DeviceViewerConfigurationModuleComponent } from '../device-viewer-configuration-module/device-viewer-configuration-module.component';
import { DeviceViewerConfigurationMqttComponent } from '../device-viewer-configuration-mqtt/device-viewer-configuration-mqtt.component';
import { DeviceViewerConfigurationOptionsComponent } from '../device-viewer-configuration-options/device-viewer-configuration-options.component';
import { DeviceViewerConfigurationOthersComponent } from '../device-viewer-configuration-others/device-viewer-configuration-others.component';
import { DeviceViewerConfigurationWifiComponent } from '../device-viewer-configuration-wifi/device-viewer-configuration-wifi.component';

@Component({
  selector: 'app-device-viewer-configuration',
  templateUrl: './device-viewer-configuration.component.html',
  styleUrls: ['./device-viewer-configuration.component.scss'],
})
export class DeviceViewerConfigurationComponent implements OnInit {

  @Input() deviceId: string;

  constructor(
    private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  async configureModule(): Promise<void> {
    const deviceId = this.deviceId;
    const modal = await this.modalController.create({
      component: DeviceViewerConfigurationModuleComponent,
      componentProps: { deviceId }
    });
    return await modal.present();
  }

  async configureWifi(): Promise<void> {
    const deviceId = this.deviceId;
    const modal = await this.modalController.create({
      component: DeviceViewerConfigurationWifiComponent,
      componentProps: { deviceId }
    });
    return await modal.present();
  }

  async configureMqtt(): Promise<void> {
    const deviceId = this.deviceId;
    const modal = await this.modalController.create({
      component: DeviceViewerConfigurationMqttComponent,
      componentProps: { deviceId }
    });
    return await modal.present();
  }

  async configureOther(): Promise<void> {
    const deviceId = this.deviceId;
    const modal = await this.modalController.create({
      component: DeviceViewerConfigurationOthersComponent,
      componentProps: { deviceId }
    });
    return await modal.present();
  }

  async configureOptions(): Promise<void> {
    const deviceId = this.deviceId;
    const modal = await this.modalController.create({
      component: DeviceViewerConfigurationOptionsComponent,
      componentProps: { deviceId }
    });
    return await modal.present();
  }

}
