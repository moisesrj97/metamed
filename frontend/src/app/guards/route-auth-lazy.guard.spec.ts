import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LandingComponent } from '../landing/landing.component';

import { RouteAuthLazyGuard } from './route-auth-lazy.guard';

describe('RouteAuthLazyGuard', () => {
  let guard: RouteAuthLazyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
          { path: '', component: LandingComponent },
        ]),
      ],
    });
    guard = TestBed.inject(RouteAuthLazyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('When tokenService return no token', () => {
    it('canActivate return true', () => {
      localStorage.clear();
      expect(guard.canLoad({ path: '' })).toBeTrue();
    });
  });
  describe('When tokenService return no token', () => {
    it('canActivate return true', () => {
      localStorage.clear();
      localStorage.setItem('token', 'token');
      expect(guard.canLoad({ path: '' })).toBeFalse();
    });
  });
  describe('When tokenService return no token', () => {
    it('canActivate return true', () => {
      localStorage.clear();
      expect(guard.canLoad({ path: 'test' })).toBeFalse();
    });
  });
  describe('When tokenService return no token', () => {
    it('canActivate return true', () => {
      localStorage.clear();
      localStorage.setItem('token', 'token');
      expect(guard.canLoad({ path: 'test' })).toBeTrue();
    });
  });
});
