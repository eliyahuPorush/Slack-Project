import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Friend } from 'src/app/models/friend.model';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Message } from 'src/app/models/message.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user ;
  constructor(
    private authSRV: AuthService
    ) { }

  ngOnInit(): void {
   this.user = this.authSRV.getUser() ;
  }

}
