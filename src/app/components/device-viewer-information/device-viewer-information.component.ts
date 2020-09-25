import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import { Command } from 'src/app/models/command';
import { DeviceConfig } from 'src/app/models/device-config';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-information',
  templateUrl: './device-viewer-information.component.html',
  styleUrls: ['./device-viewer-information.component.scss'],
})
export class DeviceViewerInformationComponent implements OnInit {

  @Input() deviceId: string;

  private cfg: DeviceConfig;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController) {
      this.api.onDeviceConfigChange((data: { deviceId: string, config: DeviceConfig }) => {
        if (data.deviceId === this.deviceId) {
          this.cfg = data.config;
        }
      });
    }

  async ngOnInit() {
    if (this.deviceId) {
      this.cfg = await this.api.getDeviceConfig(this.deviceId);
    }
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  async doRefresh(ev: any): Promise<void> {
    if (this.deviceId) {
      const timeout = setTimeout(ev.target.complete, 3000);
      this.cfg = await this.api.getDeviceConfig(this.deviceId, true);
      clearTimeout(timeout);
      ev.target.complete();
    } else {
      ev.target.complete();
    }
  }

  async update(): Promise<void> {
    const command: Command = {
      command: 'STATUS',
      parameters: '0'
    };
    await this.api.sendCommandDevice(this.deviceId, command);
  }

}
