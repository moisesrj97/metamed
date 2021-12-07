import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TokenService } from '../services/token/token.service';

import { RouteAuthGuard } from './route-auth.guard';

describe('RouteAuthLazyGuard', () => {
  let guard: RouteAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
    });

    guard = TestBed.inject(RouteAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('When tokenService return no token', () => {
    it('canActivate return true', () => {
      localStorage.clear();
      expect(
        guard.canActivate({
          routeConfig: { path: 'test' },
        } as ActivatedRouteSnapshot)
      ).toBeTrue();
    });
  });

  describe('When tokenService return a valid token', () => {
    it('canActivate return false', () => {
      localStorage.clear();
      localStorage.setItem('token', 'token');
      expect(
        guard.canActivate({
          routeConfig: { path: 'test' },
        } as ActivatedRouteSnapshot)
      ).toBeFalse();
    });
  });

  describe('When tokenService return no token', () => {
    it('canActivate return true', () => {
      localStorage.clear();
      expect(
        guard.canActivate({
          routeConfig: { path: 'info' },
        } as ActivatedRouteSnapshot)
      ).toBeFalse();
    });
  });

  describe('When tokenService return a valid token', () => {
    it('canActivate return false', () => {
      localStorage.clear();
      localStorage.setItem('token', 'token');
      expect(
        guard.canActivate({
          routeConfig: { path: 'info' },
        } as ActivatedRouteSnapshot)
      ).toBeTrue();
    });
  });
});
