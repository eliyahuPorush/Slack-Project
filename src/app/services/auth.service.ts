import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Subject, BehaviorSubject } from 'rxjs';


interface responced{
  idToken: string ;
  email: string ;
  refreshToken: string ;
  expiresIn: string ;
  localId: string ;
  registered? : boolean ;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User ;
  isLogedIn = false ;
  errorFound = new Subject<string>() ;
  constructor(private http: HttpClient, private router: Router) { }


  signUp(email: string, password: string){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + 'AIzaSyCFHhL5pC5_ZeVTaq8bQgfCSNcUOjPvNaE' ;
    this.http.post<responced>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).subscribe((res: responced) => {
      this.isLogedIn = true ;
        this.user = new User(res.idToken, res.email, "" ,res.localId, res.refreshToken, res.expiresIn) ;
        this.router.navigate([res.email, 'details']) ;
      
    })
  }
  logIn(email: string, password: string){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + 'AIzaSyCFHhL5pC5_ZeVTaq8bQgfCSNcUOjPvNaE' ;
    this.http.post<responced>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).subscribe((res: responced) => {
      if(res.registered){
        
        this.isLogedIn = true ;
        this.user = new User(res.idToken, res.email, "" ,res.localId, res.refreshToken, res.expiresIn, res.registered) ;
        this.router.navigate([res.email , 'dashboard']) ;
        
      } 
    }, error => {
      let errorMassege = error.error.error.message ;
      this.errorFound.next(this.handleErrorMessage(errorMassege)) ;
    })
  }

  private handleErrorMessage(message: string){
    switch(message){
      case 'EMAIL_NOT_FOUND': 
      case 'INVALID_PASSWORD':
        return 'one of details is incorrect...try again' ;
      default: return 'Unkonwn Error'
    }

  }
  getUser(){
    return this.user ;
  }
}
