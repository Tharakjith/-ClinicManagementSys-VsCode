import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsBillComponent } from './patients-bill.component';

describe('PatientsBillComponent', () => {
  let component: PatientsBillComponent;
  let fixture: ComponentFixture<PatientsBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
