import { TestBed } from '@angular/core/testing';

import { StatePersistingService } from './state-persisting.service';

describe('StatePersistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatePersistingService = TestBed.get(StatePersistingService);
    expect(service).toBeTruthy();
  });
});
