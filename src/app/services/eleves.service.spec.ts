import { TestBed } from '@angular/core/testing';

import { EleveService } from './eleve.service';

describe('ElevesService', () => {
  let service: EleveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EleveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
