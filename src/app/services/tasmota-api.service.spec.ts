import { TestBed } from '@angular/core/testing';

import { TasmotaApiService } from './tasmota-api.service';

describe('TasmotaApiService', () => {
  let service: TasmotaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasmotaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
