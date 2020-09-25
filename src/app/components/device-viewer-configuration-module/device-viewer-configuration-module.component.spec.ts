import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerConfigurationModuleComponent } from './device-viewer-configuration-module.component';

describe('DeviceViewerConfigurationModuleComponent', () => {
  let component: DeviceViewerConfigurationModuleComponent;
  let fixture: ComponentFixture<DeviceViewerConfigurationModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerConfigurationModuleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerConfigurationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
