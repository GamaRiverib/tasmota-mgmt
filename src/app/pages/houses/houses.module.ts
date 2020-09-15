import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HousesPageRoutingModule } from './houses-routing.module';

import { HousesPage } from './houses.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HouseListComponent } from 'src/app/components/house-list/house-list.component';

@NgModule({
  entryComponents: [
    HouseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HousesPageRoutingModule
  ],
  declarations: [HousesPage]
})
export class HousesPageModule {}
