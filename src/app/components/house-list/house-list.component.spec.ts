import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HouseListComponent } from './house-list.component';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
