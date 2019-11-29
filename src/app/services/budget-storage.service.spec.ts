import { TestBed } from '@angular/core/testing';

import { BudgetStorageService } from './budget-storage.service';

describe('BudgetStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetStorageService = TestBed.get(BudgetStorageService);
    expect(service).toBeTruthy();
  });
});
