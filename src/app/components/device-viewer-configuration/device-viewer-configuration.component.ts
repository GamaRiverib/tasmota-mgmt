import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-configuration',
  templateUrl: './device-viewer-configuration.component.html',
  styleUrls: ['./device-viewer-configuration.component.scss'],
})
export class DeviceViewerConfigurationComponent implements OnInit {

  @Input() deviceId: string;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  async configureModule(): Promise<void> {
    console.log('configureModule');
  }

  async configureWifi(): Promise<void> {
    console.log('configureWifi');
  }

  async configureMqtt(): Promise<void> {
    console.log('configureMqtt');
  }

  async configureOther(): Promise<void> {
    console.log('configureOther');
  }

  async configureOptions(): Promise<void> {
    console.log('configureOptions');
  }

}
