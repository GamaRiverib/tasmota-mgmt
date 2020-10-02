import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Device } from 'src/app/models/device';
import { House } from 'src/app/models/house';
import { Room } from 'src/app/models/room';
import { InjectionService } from 'src/app/services/injection.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { getWidgetComponent } from 'src/app/widgets';
import { WidgetGroupSettings } from 'src/app/widgets/device-view-settings';
import { SinglePowerDriverOptions } from 'src/app/widgets/single-power-driver/single-power-driver.component';
import { Widget } from 'src/app/widgets/widget';
import { WidgetSettings } from 'src/app/widgets/widget-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent, { read: ViewContainerRef }) content: ViewContainerRef;

  house: House;
  houses: House[];

  constructor(
    private injection: InjectionService,
    private api: TasmotaApiService,
    private localStorage: LocalStorageService) {
      setTimeout(this.appendWidgets.bind(this));
  }

  async ngOnInit(): Promise<void> {
  }

  private async appendWidgets(): Promise<void> {
    const houseId = await this.localStorage.getDefaultHouseId();
    this.houses = await this.api.getHouses();
    if (this.houses.length > 0) {
      const defaultHouse = this.houses.find(h => h.default);
      if (defaultHouse) {
        this.house = defaultHouse;
      } else {
        const index = houseId ? this.houses.findIndex(h => h.id === houseId) : 0;
        this.house = this.houses[index];
        await this.localStorage.setDefaultHouseId(this.house.id);
      }
    }
    const allDeviceIds: string[] = [];
    (this.house.rooms || []).forEach(r => {
      if (r.devices) {
        r.devices.map(d => d.id).forEach(id => allDeviceIds.push(id));
      }
    });
    const deviceIds = allDeviceIds.filter((id: string, index: number, arr: string[]) => {
      return arr.indexOf(id) === index;
    });
    const AllDevices = await this.api.getDevices();
    const devices = AllDevices.filter(d => {
      return deviceIds.findIndex(id => id === d.id) >= 0;
    });
    console.log({devices});
    devices.forEach(d => {
      const widget = {
        widget: 'SinglePowerDriverComponent',
        options: { index: '', room: 'Test' }
      };
      if (d.FriendlyName && d.FriendlyName.length > 1) {
        widget.options.index = '1';
      }
      this.appendWidget(widget, d);
    });
  }

  private async appendWidget(widgetSettings: WidgetSettings, device: Device): Promise<void> {
    const component: Type<Widget> = getWidgetComponent(widgetSettings.widget);
    const componentRef = this.injection.appendComponent<Widget>(component, {}, this.content.element.nativeElement);
    componentRef.instance.api = this.api;
    componentRef.instance.device = device;
    componentRef.instance.options = widgetSettings.options;
    this.api.onDeviceStateChange(d => componentRef.instance.updateView(d));
  }

  async changeHouse(): Promise<void> {
    // console.log(this.house); // TODO: Handle change
    console.log('Selected house change', this.house.id);
    // this.house.rooms.forEach(r => this.getRoomWidgets(r));
  }

  async showHouseOptions(ev: any): Promise<void> {

  }

  async doRefresh(ev: any): Promise<void> {
    console.log('doRefresh'); // TODO
    setTimeout(ev.target.complete, 500);
  }

}
