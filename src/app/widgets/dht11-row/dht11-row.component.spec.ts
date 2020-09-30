import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Dht11RowComponent } from './dht11-row.component';

describe('Dht11RowComponent', () => {
  let component: Dht11RowComponent;
  let fixture: ComponentFixture<Dht11RowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dht11RowComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Dht11RowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
