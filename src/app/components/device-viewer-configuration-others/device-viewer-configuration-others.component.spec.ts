import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceViewerConfigurationOthersComponent } from './device-viewer-configuration-others.component';

describe('DeviceViewerConfigurationOthersComponent', () => {
  let component: DeviceViewerConfigurationOthersComponent;
  let fixture: ComponentFixture<DeviceViewerConfigurationOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerConfigurationOthersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewerConfigurationOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
