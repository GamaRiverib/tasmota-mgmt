import { Component, Input, OnChanges, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActionSheetController, IonContent, ModalController } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { InjectionService } from 'src/app/services/injection.service';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { Dht11Component } from 'src/app/widgets/dht11/dht11.component';
import { PirMotionComponent } from 'src/app/widgets/pir-motion/pir-motion.component';
import { PowerStateComponent } from 'src/app/widgets/power-state/power-state.component';
import { Widget } from 'src/app/widgets/widget';

@Component({
  selector: 'app-device-viewer',
  templateUrl: './device-viewer.component.html',
  styleUrls: ['./device-viewer.component.scss'],
})
export class DeviceViewerComponent implements OnInit, OnChanges {

  @Input() device: Device;
  @ViewChild(IonContent, { read: ViewContainerRef }) content: ViewContainerRef;

  private widgets: Type<Widget>[];

  constructor(
    private injection: InjectionService,
    private api: TasmotaApiService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController) {
      // TODO: get Device Main Page Widgets
      this.widgets = [];
      this.widgets.push(PowerStateComponent, Dht11Component);
      setTimeout(this.appendWidgets.bind(this));
    }

  async ngOnInit(): Promise<void> {
  }

  ngOnChanges(record: any): void {
    console.log('device-viewer', 'onChanges', record);
  }

  private appendWidgets(): void {
    if (this.device.id === 'senso_A54B47') {
      this.widgets[0] = PirMotionComponent;
    }
    this.widgets.forEach(c => this.appendWidget(c));
  }

  private async appendWidget(component: Type<Widget>): Promise<void> {
    const componentRef = this.injection.appendComponent(component, {}, this.content.element.nativeElement);
    const widget: Widget = componentRef.instance;
    widget.api = this.api;
    widget.device = this.device;
    widget.options = { indexes: [''], stateOnPower: true };
    this.api.onDeviceStateChange(d => widget.updateView(d));
    // this.api.onDeviceStateChange(widget.updateView.bind(widget));
  }


  back() {
    this.modalController.dismiss({ dismissed: true });
  }

  async showOptions(): Promise<void> {
    console.log('showOptions');
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
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
