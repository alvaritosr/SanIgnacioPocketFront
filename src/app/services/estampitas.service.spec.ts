import { TestBed } from '@angular/core/testing';

import { EstampitasService } from './estampitas.service';

describe('EstampitasServiceService', () => {
  let service: EstampitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstampitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
