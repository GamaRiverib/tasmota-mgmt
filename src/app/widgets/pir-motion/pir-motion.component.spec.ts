import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PirMotionComponent } from './pir-motion.component';

describe('PirMotionComponent', () => {
  let component: PirMotionComponent;
  let fixture: ComponentFixture<PirMotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PirMotionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PirMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
