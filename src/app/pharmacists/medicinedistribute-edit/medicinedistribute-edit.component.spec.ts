import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinedistributeEditComponent } from './medicinedistribute-edit.component';

describe('MedicinedistributeEditComponent', () => {
  let component: MedicinedistributeEditComponent;
  let fixture: ComponentFixture<MedicinedistributeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinedistributeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinedistributeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
