import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputModalComponent } from './input-modal.component';

describe('InputModalComponent', () => {
  let component: InputModalComponent;
  let fixture: ComponentFixture<InputModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
