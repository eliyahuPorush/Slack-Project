import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Friend } from 'src/app/models/friend.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: firebase.User ;
  userName: string ;
  listLoded: boolean = false ;
  constructor(
    private authSRV: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.authSRV.isLogedIn.subscribe(bool => {
      if(bool){
        this.user = this.authSRV.getUser() ;
        this.userName = this.user.displayName ;
        this.listLoded = true ;
      }
    })
  }
  addFriend(){
    this.router.navigate(['add_friend'], {relativeTo: this.activeRoute})
  }
  logout() {
    this.authSRV.logout() ;
  }
  profile(){
    this.router.navigate([ this.user.email, 'dashboard','profile'])
  }

}
