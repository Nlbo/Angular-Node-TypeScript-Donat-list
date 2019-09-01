import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.checkExp()) {
      return true;
    } else {
      this.router.navigate(['auth'])

    }
  }

  checkExp() {
    let token = localStorage.getItem('token');
    let decodedToken = helper.decodeToken(token);
    return token && decodedToken.exp > (new Date().getTime() + 1) / 1000;
  }
  
}
