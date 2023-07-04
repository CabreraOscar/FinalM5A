import { TestBed } from '@angular/core/testing';

import { DetalleordenService } from './detalleorden.service';

describe('DetalleordenService', () => {
  let service: DetalleordenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleordenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
