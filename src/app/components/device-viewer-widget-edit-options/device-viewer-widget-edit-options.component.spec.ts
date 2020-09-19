import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerWidgetEditOptionsComponent } from './device-viewer-widget-edit-options.component';

describe('DeviceViewerWidgetEditOptionsComponent', () => {
  let component: DeviceViewerWidgetEditOptionsComponent;
  let fixture: ComponentFixture<DeviceViewerWidgetEditOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerWidgetEditOptionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerWidgetEditOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
