import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouteAuthLazyGuard } from './route-auth-lazy.guard';

describe('RouteAuthLazyGuard', () => {
  let guard: RouteAuthLazyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(RouteAuthLazyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
