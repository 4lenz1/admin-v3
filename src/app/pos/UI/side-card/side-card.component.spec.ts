import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SideCardComponent } from './side-card.component';

describe('SideCardComponent', () => {
  let component: SideCardComponent;
  let fixture: ComponentFixture<SideCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SideCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
