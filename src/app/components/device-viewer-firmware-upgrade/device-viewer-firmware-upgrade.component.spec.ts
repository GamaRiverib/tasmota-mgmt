import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerFirmwareUpgradeComponent } from './device-viewer-firmware-upgrade.component';

describe('DeviceViewerFirmwareUpgradeComponent', () => {
  let component: DeviceViewerFirmwareUpgradeComponent;
  let fixture: ComponentFixture<DeviceViewerFirmwareUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerFirmwareUpgradeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerFirmwareUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
