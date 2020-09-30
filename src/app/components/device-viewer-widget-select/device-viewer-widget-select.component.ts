import { Component, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InjectionService } from 'src/app/services/injection.service';
import { getWidgetNames, getWidgetOptionsComponent } from 'src/app/widgets';
import { WidgetOptions } from 'src/app/widgets/widget';

@Component({
  selector: 'app-device-viewer-widget-select',
  templateUrl: './device-viewer-widget-select.component.html',
  styleUrls: ['./device-viewer-widget-select.component.scss'],
})
export class DeviceViewerWidgetSelectComponent implements OnInit {

  selected: string;
  options: any;
  widgets: { name: string, value: string }[];

  @ViewChild('optionsForm', { read: ViewContainerRef, static: false }) content: ViewContainerRef;
  private formOptions: ComponentRef<any>;

  constructor(
    private injection: InjectionService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.widgets = getWidgetNames();
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  save() {
    if (this.selected) {
      const widget = this.selected;
      const options = this.options || {};
      console.log({ widget, options });
      this.modalController.dismiss({ widget, options }, 'selected');
    }
  }

  changeSelected() {
    const component: Type<WidgetOptions> = getWidgetOptionsComponent(this.selected);
    this.formOptions = this.injection.appendComponent(component, {}, this.content.element.nativeElement, true);
    const widgetOptions: WidgetOptions = this.formOptions.instance;
    this.options = widgetOptions.getOptions();
  }

}
