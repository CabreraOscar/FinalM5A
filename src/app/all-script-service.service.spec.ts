import { TestBed } from '@angular/core/testing';

import { AllScriptServiceService } from './all-script-service.service';

describe('AllScriptServiceService', () => {
  let service: AllScriptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllScriptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
