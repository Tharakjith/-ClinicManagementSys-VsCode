import { TestBed } from '@angular/core/testing';

import { LabTestServiceService } from './lab-test-service.service';

describe('LabTestServiceService', () => {
  let service: LabTestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabTestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
