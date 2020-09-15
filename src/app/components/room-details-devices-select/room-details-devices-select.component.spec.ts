import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomDetailsDevicesSelectComponent } from './room-details-devices-select.component';

describe('RoomDetailsDevicesSelectComponent', () => {
  let component: RoomDetailsDevicesSelectComponent;
  let fixture: ComponentFixture<RoomDetailsDevicesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailsDevicesSelectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDetailsDevicesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
