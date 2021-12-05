import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStore } from '../models/interfaces';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RouteAuthLazyGuard implements CanLoad {
  constructor(private router: Router, private tokenService: TokenService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /* let result;
    if (['', 'auth'].includes(route.path as string)) {
      if (this.tokenService.getTokenFromLocalStorage()) {
        this.router.navigate(['/dashboard']);
        result = false;
      }
      result = true;
    } else {
      if (!this.tokenService.getTokenFromLocalStorage()) {
        this.router.navigate(['/']);
        result = false;
      }
      result = true;
    }

    return result as boolean; */
    return true;
  }
}
