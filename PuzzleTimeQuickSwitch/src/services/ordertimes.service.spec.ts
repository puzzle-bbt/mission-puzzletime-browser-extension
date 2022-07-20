import { TestBed } from '@angular/core/testing';

import { OrdertimesService } from '../ordertimes.service';

describe('OrdertimesService', () => {
  let service: OrdertimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdertimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
