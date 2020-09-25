import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerConfigurationWifiComponent } from './device-viewer-configuration-wifi.component';

describe('DeviceViewerConfigurationWifiComponent', () => {
  let component: DeviceViewerConfigurationWifiComponent;
  let fixture: ComponentFixture<DeviceViewerConfigurationWifiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerConfigurationWifiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerConfigurationWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
