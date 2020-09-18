import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PowerStateComponent } from './power-state/power-state.component';
import { Dht11Component } from './dht11/dht11.component';
import { PirMotionComponent } from './pir-motion/pir-motion.component';

@NgModule({
  declarations: [
    Dht11Component,
    PirMotionComponent,
    PowerStateComponent
  ],
  exports: [
    Dht11Component,
    PirMotionComponent,
    PowerStateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class WidgetsModule { }
