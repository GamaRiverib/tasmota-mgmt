import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-configuration-options',
  templateUrl: './device-viewer-configuration-options.component.html',
  styleUrls: ['./device-viewer-configuration-options.component.scss'],
})
export class DeviceViewerConfigurationOptionsComponent implements OnInit {

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
