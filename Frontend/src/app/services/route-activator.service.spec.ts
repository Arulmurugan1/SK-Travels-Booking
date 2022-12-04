import { TestBed } from '@angular/core/testing';

import { RouteActivatorService } from './route-activator.service';

describe('RouteActivatorService', () => {
  let service: RouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
