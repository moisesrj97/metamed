import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RouteAuthLazyGuard implements CanLoad {
  constructor(private router: Router, private tokenService: TokenService) {}
  canLoad(
    route: Route
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let result;
    if (['', 'auth'].includes(route.path as string)) {
      if (this.tokenService.getTokenFromLocalStorage()) {
        this.router.navigate(['/dashboard']);
        result = false;
      } else {
        result = true;
      }
    } else {
      if (!this.tokenService.getTokenFromLocalStorage()) {
        this.router.navigate(['/']);
        result = false;
      } else {
        result = true;
      }
    }

    return result;
  }
}
