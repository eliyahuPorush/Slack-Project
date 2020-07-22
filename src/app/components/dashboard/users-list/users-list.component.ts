import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from 'src/app/services/users-data.service';
import { Friend } from 'src/app/models/friend.model';
import { FriendsDataService } from 'src/app/services/friends-data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users = ['eli','yakov'] ;
 friends: Friend[] ;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private usersData: UsersDataService, private friendsData: FriendsDataService) { }

  ngOnInit(): void {
    this.friends = this.friendsData.friends ;
    
    
  }
  addFriend(){
    this.router.navigate(['add_friend'], {relativeTo: this.activeRoute})
  }

}
