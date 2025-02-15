import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DavailComponent } from './davail.component';

describe('DavailComponent', () => {
  let component: DavailComponent;
  let fixture: ComponentFixture<DavailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DavailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DavailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
