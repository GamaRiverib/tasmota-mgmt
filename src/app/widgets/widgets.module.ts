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

@NgModule({
  declarations: [
    Dht11Component,
    Dht11OptionsComponent,
    PirMotionComponent,
    PirMotionOptionsComponent,
    PowerStateComponent,
    PowerStateOptionsComponent
  ],
  exports: [
    Dht11Component,
    Dht11OptionsComponent,
    PirMotionComponent,
    PirMotionOptionsComponent,
    PowerStateComponent,
    PowerStateOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class WidgetsModule { }