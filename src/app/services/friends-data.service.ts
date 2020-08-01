import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators' ;


import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Friend } from '../models/friend.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FriendsDataService {
  private friendsList: Friend[] ;
  baseURL = "https://slack-b0c55.firebaseio.com/" ;
  user:User = this.authSRV.getUser() ;
  userEmailDotsOut = this.user.email.replace('.','') ;
  constructor(
    private http: HttpClient,
    private authSRV: AuthService,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute
     ) { 
      
  }
  get friends(){ return this.friendsList} ;

  getFriendsFromServer(){
      return this.db.collection(this.user.email + '-friends').valueChanges(); 
}

  getFriendName(){
    let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
    return this.db.collection(this.user.email + "-friends").doc(activeFriendEmail).valueChanges()
  }

  addFriend(friend: Friend){
    this.db.collection(this.user.email + '-friends').doc(friend.email).set({name: friend.name, email:friend.email}) ;
  }
  getFriendMessages(friendEmail: string){
    let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
      return this.db.
        collection(this.user.email + "-friends").
        doc(activeFriendEmail).
        collection("text_messages").
        valueChanges().
        pipe(map(
        data => {
          let newArr: string[] = [] ;
          data.forEach( item => newArr.push(item["message"]))
          return newArr ;
        }))
    } 
    addText(text: string){
      const id = this.db.createId() ;
      let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
      this.db.
      collection(this.user.email + "-friends").
      doc(activeFriendEmail).
      collection("text_messages").doc(id).set({message: text}) ;
      const id2 = this.db.createId() ;
      this.db.
      collection(activeFriendEmail + "-friends").
      doc(this.user.email).
      collection("text_messages").doc(id2).set({message: text})

    }

}
