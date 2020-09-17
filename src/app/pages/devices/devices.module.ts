import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicesPageRoutingModule } from './devices-routing.module';

import { DevicesPage } from './devices.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DeviceListComponent } from 'src/app/components/device-list/device-list.component';
import { WidgetsModule } from 'src/app/widgets/widgets.module';

@NgModule({
  entryComponents: [
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    WidgetsModule,
    DevicesPageRoutingModule
  ],
  declarations: [DevicesPage]
})
export class DevicesPageModule {}
