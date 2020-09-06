import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase';



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
  user:firebase.User ;
  isLogedIn = new BehaviorSubject<boolean>(false) ;
  errorFound = new Subject<string>() ;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    public auth: AngularFireAuth
    ) {}

    loginWithGoogle() {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(v => {
         this.loginSuccess(v) ;
      })
      .then(() => this.router.navigate([this.user.email , 'dashboard']) )
    }
    logout() {
        this.auth.signOut().then(res =>{
        this.user = undefined ;
        this.router.navigate(['login']) ;
        this.isLogedIn.next(false) ;
      });
    }
  signUp(name:string, email: string, password: string, phone?: string, alies?:File){
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        firebase.auth().currentUser.updateEmail(email) ;   //  need to fix all function -- update phone missing
        firebase.auth().currentUser.updateProfile({displayName: name}) ;
      })
      .then(v => {
        this.db.firestore.collection(email + "-friends").doc(email).set({email:email, name: name+ "(me)"})
        this.db.firestore.collection(email + "-details").doc('details').set({email:email, name: name, phone: phone})
      })
      .then(() => this.logIn(email, password))
      .then(() => this.isLogedIn.next(true))
      .catch(error => {
        console.log(error);
      })
  }
  logIn(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password).then(res => {
      this.loginSuccess(res) ;
    })
    .then(() => this.router.navigate([this.user.email , 'dashboard']) )
    .then(() => this.isLogedIn.next(true))
    .catch(error => {
      console.log('error-- ', error);
      let errorMassege = error.message ;
      this.errorFound.next(this.handleErrorMessage(errorMassege)) ;
    });
  }
  private loginSuccess(res){
    this.user = firebase.auth().currentUser ;
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
  updateProfile(name: string, imgURL: string, email?: string, phone: string = '', elias?: File){   // no update is happening !
    let userToUpdate:UserUpdate = {name: name,email: email,imgURL: imgURL,phone: phone,elias: elias} 
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
