import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { House } from 'src/app/models/house';
import { InjectionService } from 'src/app/services/injection.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TasmotaApiService } from 'src/app/services/tasmota-api.service';
import { HouseViewWidgetGroupSettings } from 'src/app/widgets/house-view-widget-group-settings';
import { Layout } from 'src/app/layouts/layout';
import { getLayoutComponent } from 'src/app/layouts';

const VIEW_ID = 'home';

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
      setTimeout(this.appendLayout.bind(this));
  }

  async ngOnInit(): Promise<void> {
  }

  private async appendLayout(): Promise<void> {
    const houseId = await this.localStorage.getDefaultHouseId();
    try {
      this.houses = await this.api.getHouses();
    } catch (error) {
      console.log(error);
    }
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
    if (this.house) {
      // let houseViewSettings: HouseViewWidgetGroupSettings = await this.localStorage.getHouseViewWidgetGroupSettings(this.house.id, VIEW_ID);
      let houseViewSettings = undefined;
      if (!houseViewSettings) {
        houseViewSettings = {
          house: this.house.id,
          view: VIEW_ID,
          layout: 'TwoColsGridComponent',
          widgets: [{
            device: 'recamara1',
            room: 'e1c32561-ba4c-46dc-ae8f-17b84470410a',
            widget: 'SinglePowerDriverComponent',
            options: {
              index: '',
              roomName: 'Recámara principal'
            }
          }, {
            device: 'cocina',
            room: '17283709-b35c-47b9-85cc-291d76e876f9',
            widget: 'SinglePowerDriverComponent',
            options: {
              index: '4',
              roomName: 'Cocina'
            }
          }, {
            device: 'cochera',
            room: 'd5dc616a-db09-41da-97e0-db3cf9160e9f',
            widget: 'SinglePowerDriverComponent',
            options: {
              index: '',
              roomName: 'Cochera'
            }
          }, {
            device: 'estancia',
            room: 'a7d0b71e-746e-44e0-bae8-14ce346e85a7',
            widget: 'SinglePowerDriverComponent',
            options: {
              index: '',
              roomName: 'Estancia'
            }
          }, {
            device: 'cocina',
            room: 'c0724560-c495-418e-ba15-e9823e74b1a9',
            widget: 'SinglePowerDriverComponent',
            options: {
              index: '2',
              roomName: 'Patio trasero'
            }
          }, {
            device: 'cocina',
            room: 'c0724560-c495-418e-ba15-e9823e74b1a9',
            widget: 'SinglePowerDriverComponent',
            options: {
              index: '3',
              roomName: 'Pasillo patio'
            }
          }]
        };
        // this.localStorage.setHouseViewWidgetGroupSettings(this.house.id, VIEW_ID, houseViewSettings);
      }
      const layout: Type<Layout> = getLayoutComponent(houseViewSettings.layout || 'TwoColsGridComponent');
      const componentRef = this.injection.appendComponent<Layout>(layout, {}, this.content.element.nativeElement);
      componentRef.instance.widgets = houseViewSettings.widgets;
    }
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
    ev.target.complete();
  }

}
