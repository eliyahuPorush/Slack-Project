import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  user:User ;
  
  
  constructor(
    private authSRV: AuthService,
    private db: AngularFirestore
    ) { }


  updateProfile(name: string, imgURL: string){
      this.user =  this.authSRV.getUser() ;
      this.db.firestore.
      collection(this.user.email + "-details").
      doc("details").
      set({email:this.user.email, name: name, imgURL: imgURL});
  }
}
