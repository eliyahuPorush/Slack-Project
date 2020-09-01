import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';


interface responced{
  idToken: string ;
  email: string ;
  refreshToken: string ;
  expiresIn: string ;
  localId: string ;
  registered? : boolean ;
}

interface UserUpdate{
  name: string ;
  email: string ;
  imgURL?: string ;
  phone?: string ;
  elias?: File ;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User ;
  isLogedIn = false ;
  errorFound = new Subject<string>() ;
  constructor(
    private http: HttpClient, 
    private router: Router,
    private db: AngularFirestore,
    public auth: AngularFireAuth) { }

    loginWithGoogle() {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(v => {
         this.loginSuccess(v) ;
      });
    }
    logout() {
      this.auth.signOut().then(res =>{
        this.router.navigate(['login']) ;
      });
      
    }
  signUp(email: string, password: string){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + 'AIzaSyCFHhL5pC5_ZeVTaq8bQgfCSNcUOjPvNaE' ;
    this.http.post<responced>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).subscribe((res: responced) => {
        this.isLogedIn = true ;
        this.user = new User(res.idToken, res.email, "" ,res.localId, res.refreshToken, res.expiresIn) ;
        // create a new collection of this user
        this.db.firestore.collection(email + "-friends").doc(email).set({email:email, name: `${email}(my)`});
        this.router.navigate([res.email, 'details']) ;
      
    })
  }
  logIn(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password).then(res => {
      this.loginSuccess(res) ;
    }).catch(error => {
      let errorMassege = error.message ;
      this.errorFound.next(this.handleErrorMessage(errorMassege)) ;
    });
  }
  private loginSuccess(res){
    this.isLogedIn = true ;
          this.user = new User(
            '', // idToken missing
            res.user.email,
            res.user.displayName,
            '',
            res.user.refreshToken,
            '',
            true,
            res.user.phone
            ) ;
        this.router.navigate([res.user.email , 'dashboard']) ;
  }
  private handleErrorMessage(message: string){
    switch(message){
      case 'EMAIL_NOT_FOUND': 
      case 'INVALID_PASSWORD':
      case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      case "The password is invalid or the user does not have a password.":
        return 'one of details is incorrect...try again' ;
      default: return 'Unkonwn Error'
    }

  }
  updateProfile(name: string, imgURL: string, email?: string, phone: string = '', elias?: File){
    let userToUpdate:UserUpdate = {name,email,imgURL,phone,elias} 
    this.db.firestore.
    collection(this.user.email + "-details").
    doc("details").
    set(userToUpdate);

    this.db.collection(this.user.email + "-friends").doc(this.user.email).set(userToUpdate)
}
  getUser(){
    return this.user ;
  }
}
