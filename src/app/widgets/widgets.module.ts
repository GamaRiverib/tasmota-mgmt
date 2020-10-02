import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PowerStateComponent } from './power-state/power-state.component';
import { Dht11Component } from './dht11/dht11.component';
import { PirMotionComponent } from './pir-motion/pir-motion.component';
import { Dht11OptionsComponent } from './dht11-options/dht11-options.component';
import { PirMotionOptionsComponent } from './pir-motion-options/pir-motion-options.component';
import { PowerStateOptionsComponent } from './power-state-options/power-state-options.component';
import { Dht11RowComponent } from './dht11-row/dht11-row.component';
import { Dht11RowOptionsComponent } from './dht11-row-options/dht11-row-options.component';
import { SinglePowerDriverComponent } from './single-power-driver/single-power-driver.component';
import { SinglePowerDriverOptionsComponent } from './single-power-driver-options/single-power-driver-options.component';

@NgModule({
  declarations: [
    Dht11Component,
    Dht11OptionsComponent,
    Dht11RowComponent,
    Dht11RowOptionsComponent,
    PirMotionComponent,
    PirMotionOptionsComponent,
    PowerStateComponent,
    PowerStateOptionsComponent,
    SinglePowerDriverComponent,
    SinglePowerDriverOptionsComponent
  ],
  exports: [
    Dht11Component,
    Dht11OptionsComponent,
    Dht11RowComponent,
    Dht11RowOptionsComponent,
    PirMotionComponent,
    PirMotionOptionsComponent,
    PowerStateComponent,
    PowerStateOptionsComponent,
    SinglePowerDriverComponent,
    SinglePowerDriverOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class WidgetsModule { }
