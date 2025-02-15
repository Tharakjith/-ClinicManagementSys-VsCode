import { TestBed } from '@angular/core/testing';

import { LabtestbillService } from './labtestbill.service';

describe('LabtestbillService', () => {
  let service: LabtestbillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabtestbillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
