import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInText = 'Log In';
  loginForm: FormGroup ;
  errorMessage :string ;

  constructor(private authSRV: AuthService) { }

  loginWithGoogle() {
    this.authSRV.loginWithGoogle() ;
  }




  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      email: new FormControl('teacher@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('teacher6040', [Validators.required, Validators.minLength(6)])
    })
    this.authSRV.errorFound.subscribe(error => 
      this.errorMessage = error
      )

  }

  onSubmit(){
    let params = [this.loginForm.controls.email.value, this.loginForm.controls.password.value] // email & password
    if(this.logInText == 'Sign Up') this.authSRV.signUp(params[0], params[1]) ; // sign up method
    else if(this.logInText == 'Log In') this.authSRV.logIn(params[0], params[1]) ; // log in method
  }
  onSignInClicked(){
    this.logInText = this.logInText == 'Sign Up'? 'Log In': 'Sign Up' ;
  }
}
