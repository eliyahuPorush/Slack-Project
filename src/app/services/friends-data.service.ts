import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators' ;


import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsDataService {
  private friendsList: Friend[] ;
  baseURL = "https://slack-b0c55.firebaseio.com/" ;
  user:User = this.authSRV.getUser() ;
  constructor(
    private http: HttpClient,
    private authSRV: AuthService
  ) { 
    // this.getFriendsFromServer().subscribe(
      // (friends: Friend[]) => {
      //   this.friendsList = friends ;
      // }
    // )
  }
  get friends(){ return this.friendsList} ;

  getFriendsFromServer(){
    let userEmailDotsOut = this.user.email.replace('.','') ;
    return this.http.get<Friend[]>(this.baseURL + userEmailDotsOut + '-friends.json').pipe(map( friends => {
      let indideFriends = friends[Object.keys(friends)[0]] ;
      return indideFriends[Object.keys(indideFriends)[0]] ;
    }));
}
  
  
  sendFriends(FriendsList: Friend[]){
      let userEmailDotsOut = this.user.email.replace('.','') ;
      this.http.post(this.baseURL + userEmailDotsOut + "-friends.json", {FriendsList}).subscribe( data => console.log(data)
      );
  }
}
