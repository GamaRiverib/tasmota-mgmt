import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { HouseListComponent } from './house-list/house-list.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomDetailsDeviceInfoComponent } from './room-details-device-info/room-details-device-info.component';
import { RoomDetailsDevicesSelectComponent } from './room-details-devices-select/room-details-devices-select.component';
import { RoomListComponent } from './room-list/room-list.component';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { DeviceListComponent } from './device-list/device-list.component';

@NgModule({
  declarations: [
    DeviceListComponent,
    HouseDetailsComponent,
    HouseEditComponent,
    HouseListComponent,
    RoomDetailsComponent,
    RoomDetailsDeviceInfoComponent,
    RoomDetailsDevicesSelectComponent,
    RoomEditComponent,
    RoomListComponent
  ],
  exports: [
    DeviceListComponent,
    HouseDetailsComponent,
    HouseEditComponent,
    HouseListComponent,
    RoomDetailsComponent,
    RoomDetailsDeviceInfoComponent,
    RoomDetailsDevicesSelectComponent,
    RoomEditComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
