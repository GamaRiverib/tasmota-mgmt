import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Command } from 'src/app/models/command';
import { DeviceConfig } from 'src/app/models/device-config';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';

@Component({
  selector: 'app-device-viewer-configuration-wifi',
  templateUrl: './device-viewer-configuration-wifi.component.html',
  styleUrls: ['./device-viewer-configuration-wifi.component.scss'],
})
export class DeviceViewerConfigurationWifiComponent implements OnInit {

  @Input() deviceId: string;

  config: any = {};

  constructor(
    private api: TasmotaApiService,
    private modalController: ModalController
  ) {
    this.api.onCommandResult(this.commandResultHandler.bind(this));
  }

  async ngOnInit() {
    try {
      const cfg: DeviceConfig = await this.api.getDeviceConfig(this.deviceId);

      if (cfg.StatusSTS) {
        if (cfg.StatusSTS.Wifi) {
          this.config.AP = cfg.StatusSTS.Wifi.AP.toString();
        }
      }

      if (cfg.StatusLOG) {
        if (cfg.StatusLOG.SSId) {
          this.config.SSId1 = cfg.StatusLOG.SSId[0];
          this.config.SSId2 = cfg.StatusLOG.SSId[1];
        }
      }
      if (cfg.StatusNET) {
        this.config.WifiConfig = cfg.StatusNET.WifiConfig.toString();
        this.config.WebServer = cfg.StatusNET.Webserver.toString();
        this.config.Hostname = cfg.StatusNET.Hostname;
        this.config.IPAddress1 = cfg.StatusNET.IPAddress;
        this.config.IPAddress2 = cfg.StatusNET.Gateway;
        this.config.IPAddress3 = cfg.StatusNET.Subnetmask;
        this.config.IPAddress4 = cfg.StatusNET.DNSServer;
      }

      // TODO: query cors
      const corsQueryCommand: Command = { command: 'CORS' };
      this.api.sendCommandDevice(this.deviceId, corsQueryCommand);
      // TODO: query setoption55, 56 and 57
      const mDnsQueryCommand: Command = { command: 'SetOption55' };
      this.api.sendCommandDevice(this.deviceId, mDnsQueryCommand);
    } catch (reason) {
      console.log(reason);
    }
  }

  private commandResultHandler(deviceId: string, result: any): void {
    if (deviceId === this.deviceId) {
      if (result) {
        if (result.CORS) {
          this.config.CORS = result.CORS;
        }
        if (result.SetOption55) {
          this.config.mDNS = result.SetOption55.toLowerCase() === 'on' || result.SetOption55.toString() === '1';
        }
      }
    }
  }

  back() {
    this.modalController.dismiss();
  }

}
