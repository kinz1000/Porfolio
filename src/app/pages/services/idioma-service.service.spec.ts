import { TestBed } from '@angular/core/testing';

import { IdiomaServiceService } from './idioma-service.service';

describe('IdiomaServiceService', () => {
  let service: IdiomaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdiomaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
