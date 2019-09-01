import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  flag = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  fileToUpload: File = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, this.custompEmailValidator]),
      phone: new FormControl('', [Validators.required, this.custompPhoneValidator]),
      password: new FormControl('', [Validators.required, this.custompPasswordValidator, Validators.minLength(5)]),
      passwordCheck: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.custompEmailValidator]),
      password: new FormControl('', [Validators.required])
    })
  }

  custompPhoneValidator(control: FormControl) {
    let re = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/;
    if(re.test(String(control.value).toLowerCase())) {
      return null;
    } else {
      return {'email': true}
    }
  }
  custompEmailValidator(control: FormControl) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(control.value).toLowerCase())) {
      return null;
    } else {
      return {'email': true}
    }
  }
  custompPasswordValidator(control: FormControl) {
    let re = /^.{4,8}$/;
    if(re.test(String(control.value).toLowerCase())) {
      return null;
    } else {
      return {'email': true}
    }
  }

  handleFileInput(e) {
    this.fileToUpload = e.target.files.item(0);
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      this.router.navigate(['content'])
    })
  }

  register() {
    let formData: FormData = new FormData();

    formData.append('firstName', this.registerForm.get('firstName').value);
    formData.append('lastName', this.registerForm.get('lastName').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('phone', this.registerForm.get('phone').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('image', this.fileToUpload);

    this.authService.register(formData).subscribe((data) => {
      this.registerForm.reset();
      this.changeFlag();
    })
  }

  changeFlag() {
    this.flag = !this.flag;
  }

}
