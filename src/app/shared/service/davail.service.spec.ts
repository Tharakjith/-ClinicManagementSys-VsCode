import { TestBed } from '@angular/core/testing';

import { DavailService } from './davail.service';

describe('DavailService', () => {
  let service: DavailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DavailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
