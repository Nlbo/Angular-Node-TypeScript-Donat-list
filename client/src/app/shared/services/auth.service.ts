import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url;

  constructor(private http: HttpClient, private globals: AppGlobals) {
    this.url = globals.url;
  }

  login(data) {
    return this.http.post(this.url + '/api/auth/login', data)
  }

  register(data) {
    return this.http.post(this.url + '/api/auth/register', data)
  }
}
