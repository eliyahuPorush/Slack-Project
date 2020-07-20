import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(
    private http: HttpClient,
    private authSRV: AuthService
    ) { }

  getUsersNames(){

  }
  updateProfile(name: string, imgURL: string){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + 'AIzaSyCFHhL5pC5_ZeVTaq8bQgfCSNcUOjPvNaE' ;
    let user: User =  this.authSRV.getUser() ;
    this.http.post(url, {
      idToken: user.idToken,
      displayName: name,
      photoUrl: imgURL,
      returnSecureToken: true

    }).subscribe( updateData => {
      console.log(updateData);
      
    })
  }
}
