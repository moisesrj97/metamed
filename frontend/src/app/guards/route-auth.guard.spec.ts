import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouteAuthGuard } from './route-auth.guard';

describe('RouteAuthLazyGuard', () => {
  let guard: RouteAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(RouteAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
