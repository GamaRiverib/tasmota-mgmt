import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TwoColsGridComponent } from './two-cols-grid/two-cols-grid.component';

@NgModule({
  declarations: [
    TwoColsGridComponent
  ],
  exports: [
      TwoColsGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class LayoutsModule { }
