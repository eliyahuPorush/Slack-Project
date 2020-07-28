import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators' ;


import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Friend } from '../models/friend.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

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
  

  addFriend(friend: Friend){
    this.db.collection(this.user.email + '-friends').doc(friend.email).set({name: friend.name}) ;
  }
  getFriendMessages(friendEmail: string){
    // return this.db.collection(this.user.email + '-friends').doc(friendEmail).valueChanges();
      return this.db.
        collection(this.user.email + "-friends").
        doc(friendEmail).
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
      let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
      // this.db.collection(this.user.email + '-friends').doc(activeFriendEmail).set({})
      // this.setNewTextArr(activeFriendEmail) ;
      // this.db.collection("/eliyahuporush@gmail.com-friends").doc("nili@gmail.com").collection("text_messages").valueChanges().subscribe(
      //   l => l.forEach(o => console.log(o)
      //   )
        
      // )
      this.db.collection(this.user.email + "-friends").doc(activeFriendEmail).collection("text_messages").valueChanges().subscribe(
        ll => console.log(ll)
        
      )

    }

}
