import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from 'src/app/services/users-data.service';
import { Friend } from 'src/app/models/friend.model';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 friends:Friend[] ;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private usersData: UsersDataService, private friendsData: FriendsDataService) { }

  ngOnInit(): void {
    
      this.friendsData.getFriendsFromServer().subscribe( friends => {
      this.friends = friends[Object.keys(friends)[0]] ;
    }) ;
    
  }
  addFriend(){
    this.router.navigate(['add_friend'], {relativeTo: this.activeRoute})
  }

}
