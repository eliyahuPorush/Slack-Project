import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Friend } from '../models/friend.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  user:User ;
  
  
  constructor(
    private http: HttpClient,
    private authSRV: AuthService,
    private db: AngularFirestore
    ) { }


  updateProfile(name: string, imgURL: string){
    // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + 'AIzaSyCFHhL5pC5_ZeVTaq8bQgfCSNcUOjPvNaE' ;
      this.user =  this.authSRV.getUser() ;
      this.db.firestore.
      collection(this.user.email + "-details").
      doc("details").
      set({email:this.user.email, name: name, imgURL: imgURL});
  }
}
