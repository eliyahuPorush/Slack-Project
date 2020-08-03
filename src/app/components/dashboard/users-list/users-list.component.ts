import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from 'src/app/services/users-data.service';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 friends:Observable<any> ;
 

  constructor(private router: Router, private activeRoute: ActivatedRoute, private usersData: UsersDataService, private friendsData: FriendsDataService) { }
  @Output() friendsLoaded = new EventEmitter<boolean>() ;
  ngOnInit(): void {
    
     this.friends = this.friendsData.getFriendsFromServer()
  }
 
  friendSelected(friendEmail: string){
    this.router.navigate(["chat"], {relativeTo: this.activeRoute, queryParams:{'friend': friendEmail}})
  }

}
