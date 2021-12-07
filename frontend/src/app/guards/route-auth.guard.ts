import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RouteAuthGuard implements CanActivate {
  constructor(public tokenService: TokenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let result: boolean;
    if (
      ['info', 'meal-groups', 'exercise-groups', 'messages', 'notes'].includes(
        route.routeConfig?.path as string
      )
    ) {
      if (!this.tokenService.getTokenFromLocalStorage()) {
        this.router.navigate(['/']);
        result = false;
      } else {
        result = true;
      }
    } else {
      if (this.tokenService.getTokenFromLocalStorage()) {
        this.router.navigate(['/dashboard']);
        result = false;
      } else {
        result = true;
      }
    }

    return result;
  }
}
