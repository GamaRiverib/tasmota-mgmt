import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PowerStateComponent } from './power-state.component';

describe('PowerStateComponent', () => {
  let component: PowerStateComponent;
  let fixture: ComponentFixture<PowerStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerStateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PowerStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
