import { Component, Input, OnChanges, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActionSheetController, IonContent, ModalController } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { InjectionService } from 'src/app/services/injection.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { getWidgetComponent } from 'src/app/widgets';
import { DeviceViewSettings } from 'src/app/widgets/device-view-settings';
import { PowerStateComponent } from 'src/app/widgets/power-state/power-state.component';
import { Widget } from 'src/app/widgets/widget';
import { WidgetSettings } from 'src/app/widgets/widget-settings';
import { DeviceViewerInformationComponent } from '../device-viewer-information/device-viewer-information.component';
import { DeviceViewerWidgetsComponent } from '../device-viewer-widgets/device-viewer-widgets.component';

@Component({
  selector: 'app-device-viewer',
  templateUrl: './device-viewer.component.html',
  styleUrls: ['./device-viewer.component.scss'],
})
export class DeviceViewerComponent implements OnInit, OnChanges {

  @Input() device: Device;
  @ViewChild(IonContent, { read: ViewContainerRef }) content: ViewContainerRef;

  private widgets: WidgetSettings[];

  constructor(
    private injection: InjectionService,
    private api: TasmotaApiService,
    private localStorage: LocalStorageService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController) {
      setTimeout(this.appendWidgets.bind(this));
    }

  async ngOnInit(): Promise<void> {
  }

  ngOnChanges(record: any): void {
    console.log('device-viewer', 'onChanges', record);
  }

  private async appendWidgets(): Promise<void> {
    this.widgets = [];
    let settings: DeviceViewSettings | null = await this.localStorage.getDeviceViewSettings(this.device.id);
    if (settings === null) {
      settings = { general: {}, widgets: [{ widget: PowerStateComponent.name, options: {} }] };
      try {
        this.localStorage.setDeviceViewSettings(this.device.id, settings);
      } catch (reason) {
        console.log(reason);
      }
    }
    this.widgets = settings.widgets || [{ widget: PowerStateComponent.name }];
    this.widgets.forEach(w => this.appendWidget(w));
  }

  private async appendWidget(widgetSettings: WidgetSettings): Promise<void> {
    const component: Type<Widget> = getWidgetComponent(widgetSettings.widget);
    const componentRef = this.injection.appendComponent<Widget>(component, {}, this.content.element.nativeElement);
    componentRef.instance.api = this.api;
    componentRef.instance.device = this.device;
    componentRef.instance.options = widgetSettings.options;
    this.api.onDeviceStateChange(d => componentRef.instance.updateView(d));
  }


  back() {
    this.modalController.dismiss({ dismissed: true });
  }

  private async actionWidgetsHandler() {
    const name = this.device.DeviceName || this.device.id;
    const deviceId = this.device.id;
    const modal = await this.modalController.create({
      component: DeviceViewerWidgetsComponent,
      componentProps: { name, deviceId }
    });
    return modal.present();
  }

  private async actionInformationHandler() {
    const deviceId = this.device.id;
    const modal = await this.modalController.create({
      component: DeviceViewerInformationComponent,
      componentProps: { deviceId }
    });
    return modal.present();
  }

  async showOptions(): Promise<void> {
    console.log('showOptions');
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Widgets',
        icon: 'grid-outline',
        handler: this.actionWidgetsHandler.bind(this)
      }, {
        text: 'Information',
        icon: 'information-outline',
        handler: this.actionInformationHandler.bind(this)
      }, {
        text: 'Configuration',
        icon: 'settings-outline',
        handler: () => {
          console.log('Configuration clicked');
        }
      }, {
        text: 'Firmware upgrade',
        icon: 'cloud-upload-outline',
        handler: () => {
          console.log('Firmware upgrade clicked');
        }
      }, {
        text: 'Restart',
        icon: 'refresh-outline',
        handler: () => {
          console.log('Restart clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
