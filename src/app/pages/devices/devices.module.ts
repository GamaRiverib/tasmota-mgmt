import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicesPageRoutingModule } from './devices-routing.module';

import { DevicesPage } from './devices.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DeviceListComponent } from 'src/app/components/device-list/device-list.component';

@NgModule({
  entryComponents: [
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DevicesPageRoutingModule
  ],
  declarations: [DevicesPage]
})
export class DevicesPageModule {}
