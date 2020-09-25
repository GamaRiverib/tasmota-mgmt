import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-configuration-mqtt',
  templateUrl: './device-viewer-configuration-mqtt.component.html',
  styleUrls: ['./device-viewer-configuration-mqtt.component.scss'],
})
export class DeviceViewerConfigurationMqttComponent implements OnInit {

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
