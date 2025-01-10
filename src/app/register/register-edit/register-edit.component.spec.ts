import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEditComponent } from './register-edit.component';

describe('RegisterEditComponent', () => {
  let component: RegisterEditComponent;
  let fixture: ComponentFixture<RegisterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
