import { TestBed } from '@angular/core/testing';

import { CardListingService } from './card-listing.service';

describe('CardListingService', () => {
  let service: CardListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
