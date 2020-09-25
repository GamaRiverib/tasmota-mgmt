import { Component, Input, OnChanges, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { IonContent, ModalController, PopoverController } from '@ionic/angular';
import { Command } from 'src/app/models/command';
import { Device } from 'src/app/models/device';
import { InjectionService } from 'src/app/services/injection.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { getWidgetComponent } from 'src/app/widgets';
import { DeviceViewSettings } from 'src/app/widgets/device-view-settings';
import { PowerStateComponent } from 'src/app/widgets/power-state/power-state.component';
import { Widget } from 'src/app/widgets/widget';
import { WidgetSettings } from 'src/app/widgets/widget-settings';
import { DeviceViewerActionsMenuComponent } from '../device-viewer-actions-menu/device-viewer-actions-menu.component';

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
    private popoverController: PopoverController) {
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

  async showOptions(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: DeviceViewerActionsMenuComponent,
      componentProps: { device: this.device },
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    return popover.present();
  }

  async doRefresh(ev: any): Promise<void> {
    let timeout: any;
    try {
      timeout = setTimeout(ev.target.complete, 3000);
      const command: Command = {
        command: 'State'
      };
      this.api.sendCommandDevice(this.device.id, command);
      clearTimeout(timeout);
      ev.target.complete();
    } catch (reason) {
      clearTimeout(timeout);
      ev.target.complete();
    }
  }

}
