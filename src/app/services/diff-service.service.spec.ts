import { TestBed } from '@angular/core/testing';

import { DiffServiceService } from './diff-service.service';

describe('DiffServiceService', () => {
  let service: DiffServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiffServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
