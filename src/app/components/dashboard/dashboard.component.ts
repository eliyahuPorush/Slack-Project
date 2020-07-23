import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Friend } from 'src/app/models/friend.model';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user ;
  friends: Friend[] ;
  constructor(
    private authSRV: AuthService,
    private friendData: FriendsDataService
    ) { }

  ngOnInit(): void {
    localStorage.setItem("key","val") ;
   this.user = this.authSRV.getUser() ;
   console.log(this.user);
   

   
   
     this.friends = [
       new Friend("Doby", "doby1234@gmail.com", [
         new Message(1, new Date, "Hi Doby"),
         new Message(0, new Date, "Hi Eli"),
         new Message(1, new Date, "How are you Doby?")
       ]),
       new Friend("Shimon", "shimon1234@gmail.com", [
         new Message(1, new Date, "Hi shimon"),
         new Message(0, new Date, "Hi Eli"),
         new Message(1, new Date, "How are you shimon?")
       ])
     ]
     this.friendData.sendFriends(this.friends)
    
 
   
  
  }

}
