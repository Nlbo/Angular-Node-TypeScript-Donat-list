import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.checkExp()) {
      request = request.clone({
        setHeaders: {
          token: localStorage.getItem('token')
        }
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }


  checkExp() {
    let token = localStorage.getItem('token');
    let decodedToken = helper.decodeToken(token);
    return token && decodedToken.exp > (new Date().getTime() + 1) / 1000;
  }
}
