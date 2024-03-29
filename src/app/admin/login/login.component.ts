import { Component } from '@angular/core';
import { AdminLoginModel } from './models/admin-login-model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  adminLoginModel:AdminLoginModel=new AdminLoginModel();

  constructor(private authService:AuthService){

  }
  login(loginForm:any){
    this.adminLoginModel=loginForm;
    this.authService.login(this.adminLoginModel)
  }
}
