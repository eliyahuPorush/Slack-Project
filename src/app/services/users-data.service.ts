import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  user:User ;
  
  
  constructor(
    private http: HttpClient,
    private authSRV: AuthService
    ) { }


  updateProfile(name: string, imgURL: string){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + 'AIzaSyCFHhL5pC5_ZeVTaq8bQgfCSNcUOjPvNaE' ;
      this.user =  this.authSRV.getUser() ;
    
    this.http.post(url, {
      idToken: this.user.idToken,
      displayName: name,
      photoUrl: imgURL,
      returnSecureToken: true

    }).subscribe( updateData => {
      console.log(updateData + " -- updated !!!");
      
    })
  }
}
