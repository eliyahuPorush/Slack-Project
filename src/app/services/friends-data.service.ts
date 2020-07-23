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
  userEmailDotsOut = this.user.email.replace('.','') ;
  constructor(
    private http: HttpClient,
    private authSRV: AuthService
  ) { 

  }
  get friends(){ return this.friendsList} ;

  getFriendsFromServer(){
    return this.http.get<Friend[]>(this.baseURL + this.userEmailDotsOut + '-friends.json').pipe(map( friends => {
      // let indideFriends = friends[Object.keys(friends)[0]] ;
      // return indideFriends[Object.keys(indideFriends)[0]] ;
      return friends ;
    }));
}
  
  
  sendFriends(FriendsList: Friend[]){
      this.http.put(this.baseURL + this.userEmailDotsOut + "-friends.json", {FriendsList}).subscribe( data => console.log(data)
      );
  }
  addFriend(friend: Friend){
    this.http.patch(this.baseURL + this.userEmailDotsOut + '-friends.json', {friend}).subscribe( // need to be change
      () => console.log("friend added")
      
    )
  }
}
