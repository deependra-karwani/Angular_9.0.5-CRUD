import { TestBed } from '@angular/core/testing';

import { RegExService } from './reg-ex.service';

describe('RegExService', () => {
  let service: RegExService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegExService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
