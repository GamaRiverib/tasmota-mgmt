import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { DeviceViewerComponent } from '../device-viewer/device-viewer.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {

  @Input() devices: Device[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async viewDevice(device: Device): Promise<void> {
    const modal = await this.modalController.create({
      component: DeviceViewerComponent,
      componentProps: { device }
    });
    return await modal.present();
  }

}
