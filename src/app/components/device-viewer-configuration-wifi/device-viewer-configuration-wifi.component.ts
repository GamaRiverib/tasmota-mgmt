import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-configuration-wifi',
  templateUrl: './device-viewer-configuration-wifi.component.html',
  styleUrls: ['./device-viewer-configuration-wifi.component.scss'],
})
export class DeviceViewerConfigurationWifiComponent implements OnInit {

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
