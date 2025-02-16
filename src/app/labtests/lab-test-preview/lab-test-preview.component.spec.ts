import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestPreviewComponent } from './lab-test-preview.component';

describe('LabTestPreviewComponent', () => {
  let component: LabTestPreviewComponent;
  let fixture: ComponentFixture<LabTestPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabTestPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabTestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
