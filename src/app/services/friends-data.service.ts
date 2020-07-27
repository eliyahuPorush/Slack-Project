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
    // return this.http.get<Friend[]>(this.baseURL + this.userEmailDotsOut + '-friends.json').pipe(map( friends => {
     // // let indideFriends = friends[Object.keys(friends)[0]] ;
     // // return indideFriends[Object.keys(indideFriends)[0]] ;
      // return friends ;
      return this.db.collection(this.user.email + '-friends').valueChanges(); 
    
}
  
  
  sendFriends(FriendsList: Friend[]){
      this.http.put(this.baseURL + this.userEmailDotsOut + "-friends.json", {FriendsList}).subscribe( data => console.log(data)
      );
  }
  addFriend(friend: Friend){
    // this.http.put(this.baseURL + this.userEmailDotsOut + '-friends.json', {friend}).subscribe( // need to be change
    //   () => console.log("friend added")
    // ) ;
    this.db.collection(this.user.email + '-friends').doc(friend.email).set({name: friend.name}) ;


  }
  getFriend(friendEmail: string){
    return this.db.collection(this.user.email + '-friends').doc(friendEmail).valueChanges()
    }
    addText(text: string){
      let activeFriendEmail = this.activeRoute.snapshot.queryParams["friend"] ;
      // this.db.collection(this.user.email + '-friends').doc(activeFriendEmail).set({})
      // this.setNewTextArr(activeFriendEmail) ;
      this.db.collection(this.user.email + '-friends').valueChanges().subscribe( l => {
        console.log(l[0])
        
      })
    }
    setNewTextArr(activeFriendEmail: string){
      let oldText ;
      this.db.collection(this.user.email + '-friends').doc(activeFriendEmail).valueChanges().subscribe( text => oldText = text["texts"]) ;
      console.log(oldText);
      

    }
}
