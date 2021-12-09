import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
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
      [
        'info',
        'meal-groups',
        'meal-groups/:id',
        'exercise-groups',
        'exercise-groups/:id',
        'messages',
        'notes',
        'notes/:id',
      ].includes(route.routeConfig?.path as string)
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
