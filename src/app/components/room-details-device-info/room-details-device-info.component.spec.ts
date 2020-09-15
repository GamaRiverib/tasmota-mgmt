import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomDetailsDeviceInfoComponent } from './room-details-device-info.component';

describe('RoomDetailsDeviceInfoComponent', () => {
  let component: RoomDetailsDeviceInfoComponent;
  let fixture: ComponentFixture<RoomDetailsDeviceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailsDeviceInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDetailsDeviceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
