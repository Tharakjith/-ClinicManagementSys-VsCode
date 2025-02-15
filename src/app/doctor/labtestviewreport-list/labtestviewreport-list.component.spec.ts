import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestviewreportListComponent } from './labtestviewreport-list.component';

describe('LabtestviewreportListComponent', () => {
  let component: LabtestviewreportListComponent;
  let fixture: ComponentFixture<LabtestviewreportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabtestviewreportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabtestviewreportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
