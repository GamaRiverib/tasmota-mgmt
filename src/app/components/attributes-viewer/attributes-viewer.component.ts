import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-attributes-viewer',
  templateUrl: './attributes-viewer.component.html',
  styleUrls: ['./attributes-viewer.component.scss'],
})
export class AttributesViewerComponent implements OnInit {

  @Input() key: string;
  @Input() value: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  back() {
    this.modalController.dismiss({ dismissed: true });
  }

  isObject(data: any): boolean {
    return typeof data === 'object';
  }

  async viewAttribute(item: { key: string, value: any }): Promise<void> {
    if (this.isObject(item.value)) {
      const modal = await this.modalController.create({
        component: AttributesViewerComponent,
        componentProps: item
      });
      return await modal.present();
    }
  }

}
