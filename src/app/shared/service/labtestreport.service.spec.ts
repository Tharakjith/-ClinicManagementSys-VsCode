import { TestBed } from '@angular/core/testing';

import { LabtestreportService } from './labtestreport.service';

describe('LabtestreportService', () => {
  let service: LabtestreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabtestreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
