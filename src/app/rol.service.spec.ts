import { TestBed } from '@angular/core/testing';

import { rolService } from './rol.service';

describe('rolService', () => {
  let service: rolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(rolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
