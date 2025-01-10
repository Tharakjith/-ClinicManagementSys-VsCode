import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctormanagementEditComponent } from './doctormanagement-edit.component';

describe('DoctormanagementEditComponent', () => {
  let component: DoctormanagementEditComponent;
  let fixture: ComponentFixture<DoctormanagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctormanagementEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctormanagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
