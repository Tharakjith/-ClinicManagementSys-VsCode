import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DavailAddComponent } from './davail-add.component';

describe('DavailAddComponent', () => {
  let component: DavailAddComponent;
  let fixture: ComponentFixture<DavailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DavailAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DavailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
