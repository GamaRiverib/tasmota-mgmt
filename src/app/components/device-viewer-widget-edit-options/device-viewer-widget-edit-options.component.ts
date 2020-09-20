import { Component, ComponentRef, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InjectionService } from 'src/app/services/injection.service';
import { getWidgetOptionsComponent } from 'src/app/widgets';
import { WidgetOptions } from 'src/app/widgets/widget';

@Component({
  selector: 'app-device-viewer-widget-edit-options',
  templateUrl: './device-viewer-widget-edit-options.component.html',
  styleUrls: ['./device-viewer-widget-edit-options.component.scss'],
})
export class DeviceViewerWidgetEditOptionsComponent implements OnInit {

  @Input() widget: string;
  @Input() options: any;

  @ViewChild('optionsForm', { read: ViewContainerRef, static: false }) content: ViewContainerRef;
  private formOptions: ComponentRef<WidgetOptions>;

  constructor(
    private injection: InjectionService,
    private modalController: ModalController) {
      setTimeout(this.initialize.bind(this));
    }

  ngOnInit() {
  }

  initialize() {
    const component: Type<WidgetOptions> = getWidgetOptionsComponent(this.widget);
    this.formOptions = this.injection.appendComponent<WidgetOptions>(component, {}, this.content.element.nativeElement, true);
    this.formOptions.instance.setOptions(this.options);
  }

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  save() {
    this.options = this.formOptions.instance.getOptions();
    this.modalController.dismiss(this.options, 'saved');
  }

}
