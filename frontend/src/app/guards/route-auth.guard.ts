import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
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
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let result: boolean;
    if (this.tokenService.getTokenFromLocalStorage()) {
      console.log('false');
      this.router.navigate(['/dashboard']);
      result = false;
    } else {
      console.log('true');
      result = true;
    }

    return result;
  }
}
