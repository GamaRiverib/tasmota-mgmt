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
    let houseViewSettings: HouseViewWidgetGroupSettings = await this.localStorage.getHouseViewWidgetGroupSettings(houseId, VIEW_ID);
    if (!houseViewSettings) {
      houseViewSettings = {
        house: houseId,
        view: VIEW_ID,
        layout: 'TwoColsGridComponent',
        widgets: []
      };
      this.localStorage.setHouseViewWidgetGroupSettings(houseId, VIEW_ID, houseViewSettings);
    }
    const layout: Type<Layout> = getLayoutComponent(houseViewSettings.layout || 'TwoColsGridComponent');
    const componentRef = this.injection.appendComponent<Layout>(layout, {}, this.content.element.nativeElement);
    componentRef.instance.widgets = houseViewSettings.widgets;
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
