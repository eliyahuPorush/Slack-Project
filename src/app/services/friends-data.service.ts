import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.getFriendsFromServer().subscribe(
      (friends: Friend[]) => {
        this.friendsList = friends ;
      }
    )
  }
  get friends(){ return this.friendsList.slice()} ;

  private getFriendsFromServer(){
    return this.http.get<Friend[]>(this.baseURL + this.user.email ) ;
  }
  sendFriends(usersList: User[]){
    this.http.post(this.baseURL+ this.user.email + ".json", {usersList}).subscribe(
      () => console.log("posted users")
    ) ;
  }
}
