import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestBillComponent } from './lab-test-bill.component';

describe('LabTestBillComponent', () => {
  let component: LabTestBillComponent;
  let fixture: ComponentFixture<LabTestBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabTestBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabTestBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
