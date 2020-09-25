import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-configuration-module',
  templateUrl: './device-viewer-configuration-module.component.html',
  styleUrls: ['./device-viewer-configuration-module.component.scss'],
})
export class DeviceViewerConfigurationModuleComponent implements OnInit {

  @Input() deviceId: string;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  back() {
    this.modalController.dismiss();
  }

}
