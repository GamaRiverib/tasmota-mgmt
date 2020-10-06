import { ChangeDetectorRef, Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { InjectionService } from 'src/app/services/injection.service';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { getWidgetComponent } from 'src/app/widgets';
import { HouseWidgetSettings } from 'src/app/widgets/house-widget-settings';
import { Widget } from 'src/app/widgets/widget';
import { Layout } from '../layout';

@Component({
  selector: 'app-two-cols-grid',
  templateUrl: './two-cols-grid.component.html',
  styleUrls: ['./two-cols-grid.component.scss'],
})
export class TwoColsGridComponent implements Layout, OnInit {

  @ViewChild(IonList, { read: ElementRef, static: false }) listViewRef: ElementRef;

  // tslint:disable-next-line: variable-name
  private _widgets: HouseWidgetSettings[];
  // tslint:disable-next-line: variable-name
  private _devices: Device[];
  pairs = [];

  constructor(
    private injection: InjectionService,
    private changeDetector: ChangeDetectorRef,
    private api: TasmotaApiService) {
    setTimeout(this.appendWidgets.bind(this));
  }

  get widgets(): HouseWidgetSettings[] {
    return this._widgets || [];
  }

  set widgets(items: HouseWidgetSettings[]) {
    this._widgets = items;
    this.pairs = [];
    for (let i = 0; i < this._widgets.length; i += 2) {
      this.pairs.push({ left: `row-${i}-col-left`, right: `row-${i}-col-right`});
    }
  }

  async ngOnInit(): Promise<void> {
  }

  private async loadDevices(): Promise<void> {
    const allDeviceIds: string[] = [];
    this.widgets.forEach(w => allDeviceIds.push(w.device));
    const deviceIds = allDeviceIds.filter((id: string, index: number, arr: string[]) => {
      return arr.indexOf(id) === index;
    });
    const AllDevices = await this.api.getDevices();
    this._devices = AllDevices.filter(d => {
      return deviceIds.findIndex(id => id === d.id) >= 0;
    });
  }

  private async appendWidgets(): Promise<void> {
    if (this.listViewRef) {
      const listEl: Element = this.listViewRef.nativeElement;
      const cols = listEl.getElementsByTagName('ion-col');
      await this.loadDevices();
      if (cols.length >= this._widgets.length) {
        for (let i = 0; i < cols.length; i++) {
          const colEl: Element = cols.item(i);
          const widgetSettings: HouseWidgetSettings = this._widgets[i];
          await this.appendWidget(widgetSettings, colEl);
        }
        this.changeDetector.detectChanges();
      }
    }
  }

  private async appendWidget(widgetSettings: HouseWidgetSettings, location: Element): Promise<void> {
    const component: Type<Widget> = getWidgetComponent(widgetSettings.widget);
    const componentRef = this.injection.appendComponent<Widget>(component, {}, location);
    componentRef.instance.api = this.api;
    componentRef.instance.device = this._devices.find(d => d.id === widgetSettings.device);
    componentRef.instance.options = widgetSettings.options;
    this.api.onDeviceStateChange(d => componentRef.instance.updateView(d));
  }

}
