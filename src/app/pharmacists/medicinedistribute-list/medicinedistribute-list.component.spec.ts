import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinedistributeListComponent } from './medicinedistribute-list.component';

describe('MedicinedistributeListComponent', () => {
  let component: MedicinedistributeListComponent;
  let fixture: ComponentFixture<MedicinedistributeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinedistributeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinedistributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
