import { TestBed } from '@angular/core/testing';

import { ListingspoofService } from './listingspoof.service';

describe('ListingspoofService', () => {
  let service: ListingspoofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingspoofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
