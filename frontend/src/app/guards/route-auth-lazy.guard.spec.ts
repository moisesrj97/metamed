import { TestBed } from '@angular/core/testing';

import { RouteAuthLazyGuard } from './route-auth-lazy.guard';

describe('RouteAuthLazyGuard', () => {
  let guard: RouteAuthLazyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteAuthLazyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
