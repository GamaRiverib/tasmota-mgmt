import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DeviceViewSettings } from 'src/app/widgets/device-view-settings';
import { WidgetSettings } from 'src/app/widgets/widget-settings';
import { DeviceViewerWidgetSelectComponent } from '../device-viewer-widget-select/device-viewer-widget-select.component';

@Component({
  selector: 'app-device-viewer-widgets',
  templateUrl: './device-viewer-widgets.component.html',
  styleUrls: ['./device-viewer-widgets.component.scss'],
})
export class DeviceViewerWidgetsComponent implements OnInit {

  @Input() name: string;
  @Input() deviceId: string;

  private deviceViewSettings: DeviceViewSettings;
  reorderDisabled = true;
  widgets: WidgetSettings[];

  constructor(
    private modalController: ModalController,
    private localStorage: LocalStorageService) { }

  async ngOnInit(): Promise<void> {
    this.deviceViewSettings = await this.localStorage.getDeviceViewSettings(this.deviceId);
    this.widgets = this.deviceViewSettings.widgets;
  }

  toggleReorder(): void {
    this.reorderDisabled = !this.reorderDisabled;
  }

  async doReorder(ev: any): Promise<void> {
    let from: number = ev.detail.from;
    let to: number = ev.detail.to;
    while (from < 0) {
      from += this.widgets.length;
    }
    while (to < 0) {
        to += this.widgets.length;
    }
    if (to >= this.widgets.length) {
        let k = to - this.widgets.length;
        while ((k--) + 1) {
            this.widgets.push(undefined);
        }
    }
    this.widgets.splice(to, 0, this.widgets.splice(from, 1)[0]);
    try {
      await this.localStorage.setDeviceViewSettings(this.deviceId, this.deviceViewSettings);
    } catch (reason) {
      console.log(reason);
    }
    ev.detail.complete();
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  editWidget(widget: WidgetSettings): void {
    console.log('editWidget', widget);
  }

  async addWidget(): Promise<void> {
    const modal = await this.modalController.create({
      component: DeviceViewerWidgetSelectComponent
    });
    modal.onWillDismiss().then(response => {
      if (response.role === 'selected' && response.data) {
        this.widgets.push(response.data);
      }
    });
    return modal.present();
  }

}
