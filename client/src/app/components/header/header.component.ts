import { Component, OnInit } from '@angular/core';
import {AppGlobals} from "../../app.globals";
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  url: string = '';
  email: string = '';
  imgSrc: String = 'assets/images/person.png';
  constructor(private globals: AppGlobals) {
    this.url = globals.url;
  }

  ngOnInit() {
    let decodedToken = helper.decodeToken(localStorage.getItem('token'));
    this.email = decodedToken.email;
    this.imgSrc = decodedToken.img;
  }

  logOut() {
    localStorage.clear()
  }

}
