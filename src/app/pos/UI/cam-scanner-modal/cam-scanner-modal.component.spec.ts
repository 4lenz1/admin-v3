import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamScannerModalComponent } from './cam-scanner-modal.component';

describe('CamScannerModalComponent', () => {
  let component: CamScannerModalComponent;
  let fixture: ComponentFixture<CamScannerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamScannerModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamScannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
