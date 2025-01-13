import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctormanagementAddComponent } from './doctormanagement-add.component';

describe('DoctormanagementAddComponent', () => {
  let component: DoctormanagementAddComponent;
  let fixture: ComponentFixture<DoctormanagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctormanagementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctormanagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
