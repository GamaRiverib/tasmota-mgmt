import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PowerStateComponent } from './power-state/power-state.component';

@NgModule({
  declarations: [
    PowerStateComponent
  ],
  exports: [
    PowerStateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class WidgetsModule { }
