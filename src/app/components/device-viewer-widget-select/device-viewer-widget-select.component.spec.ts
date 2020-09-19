import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerWidgetSelectComponent } from './device-viewer-widget-select.component';

describe('DeviceViewerWidgetSelectComponent', () => {
  let component: DeviceViewerWidgetSelectComponent;
  let fixture: ComponentFixture<DeviceViewerWidgetSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerWidgetSelectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerWidgetSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
