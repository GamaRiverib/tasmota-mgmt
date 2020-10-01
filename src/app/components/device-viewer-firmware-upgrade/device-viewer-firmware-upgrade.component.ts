import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Command } from 'src/app/models/command';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

const DEFAULT_OTA_URL = 'http://ota.tasmota.com/tasmota/release/tasmota.bin';

@Component({
  selector: 'app-device-viewer-firmware-upgrade',
  templateUrl: './device-viewer-firmware-upgrade.component.html',
  styleUrls: ['./device-viewer-firmware-upgrade.component.scss'],
})
export class DeviceViewerFirmwareUpgradeComponent implements OnInit {

  @Input() deviceId: string;
  url: string;
  minimal: string;
  firmware: string;

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController) { }

  async ngOnInit(): Promise<void> {
    if (this.deviceId) {
      const otaUrlCommand: Command = {
        command: 'OtaUrl'
      };
      this.api.onCommandResult((data: { deviceId: string, result: any }) => {
        if (data && data.deviceId === this.deviceId) {
          if (data.result && data.result.OtaUrl) {
            if (data.result.OtaUrl !== this.url) {
              this.url = data.result.OtaUrl;
            } else {
              const upgradeCommand: Command = {
                command: 'Upgrade'
              };
              this.api.sendCommandDevice(this.deviceId, upgradeCommand);
            }
          }
          if (data.result && data.result.Upgrade) {
            console.log(data.result.Upgrade); // TODO: alert > already last version
          }
        }
      });
      this.url = DEFAULT_OTA_URL;
      await this.api.sendCommandDevice(this.deviceId, otaUrlCommand);
    }
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  public get upgradeByUrlEnabled(): boolean {
    return this.url && this.url.length > 0;
  }

  public get upgradeByFileEnabled(): boolean {
    return this.minimal && this.minimal.length > 0 && this.firmware && this.firmware.length > 0;
  }

  async upgradeByUrl(): Promise<void> {
    console.log('upgrade by url', this.url);
    if (this.deviceId && this.url) {
      const command: Command = {
        command: 'OtaUrl',
        parameters: this.url
      };
      await this.api.sendCommandDevice(this.deviceId, command);
    }
  }

  async upgradeByFile(): Promise<void> {
    console.log('upgrade by file', this.minimal, this.firmware);
  }

  async upgrade(): Promise<void> {
    if (this.upgradeByUrlEnabled) {
      await this.upgradeByUrl();
    } else if (this.upgradeByFileEnabled) {
      await this.upgradeByFile();
    }
  }

}
