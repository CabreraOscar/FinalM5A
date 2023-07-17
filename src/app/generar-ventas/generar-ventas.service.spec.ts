import { TestBed } from '@angular/core/testing';

import { GenerarVentasService } from './generar-ventas.service';

describe('GenerarVentasService', () => {
  let service: GenerarVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
