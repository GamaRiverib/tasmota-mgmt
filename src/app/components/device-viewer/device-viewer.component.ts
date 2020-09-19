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
      settings = { general: {}, widgets: [{ widget: PowerStateComponent.name }] };
      try {
        this.localStorage.setDeviceViewSettings(this.device.id, settings);
      } catch (reason) {
        console.log(reason);
      }
    }
    this.widgets = settings.widgets || [{ widget: PowerStateComponent.name }];
    this.widgets.forEach(c => this.appendWidget(c));
  }

  private async appendWidget(settings: WidgetSettings): Promise<void> {
    const component: Type<Widget> = getWidgetComponent(settings.widget);
    const componentRef = this.injection.appendComponent(component, {}, this.content.element.nativeElement);
    const widget: Widget = componentRef.instance;
    widget.api = this.api;
    widget.device = this.device;
    widget.options = settings.options || {};
    this.api.onDeviceStateChange(d => widget.updateView(d));
  }


  back() {
    this.modalController.dismiss({ dismissed: true });
  }

  async showOptions(): Promise<void> {
    console.log('showOptions');
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Widgets',
        icon: 'grid-outline',
        handler: async () => {
          const name = this.device.DeviceName || this.device.id;
          const deviceId = this.device.id;
          const modal = await this.modalController.create({
            component: DeviceViewerWidgetsComponent,
            componentProps: { name, deviceId }
          });
          return modal.present();
        }
      }, {
        text: 'Information',
        icon: 'information-outline',
        handler: () => {
          console.log('Information clicked');
        }
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
