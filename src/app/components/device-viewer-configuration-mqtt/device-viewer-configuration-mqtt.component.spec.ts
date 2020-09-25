import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerConfigurationMqttComponent } from './device-viewer-configuration-mqtt.component';

describe('DeviceViewerConfigurationMqttComponent', () => {
  let component: DeviceViewerConfigurationMqttComponent;
  let fixture: ComponentFixture<DeviceViewerConfigurationMqttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerConfigurationMqttComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerConfigurationMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
