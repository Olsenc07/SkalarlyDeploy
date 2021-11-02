import { TestBed } from '@angular/core/testing';

import { ScholarlyService } from './scholarly.service';

describe('ScholarlyService', () => {
  let service: ScholarlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScholarlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
