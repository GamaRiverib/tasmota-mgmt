import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinglePowerDriverOptionsComponent } from './single-power-driver-options.component';

describe('SinglePowerDriverOptionsComponent', () => {
  let component: SinglePowerDriverOptionsComponent;
  let fixture: ComponentFixture<SinglePowerDriverOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePowerDriverOptionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglePowerDriverOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
