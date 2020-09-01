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
  user: User ;
  userName: string ;
  listLoded: boolean = false ;
  constructor(
    private authSRV: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.user = this.authSRV.getUser() ;
    this.db.collection(this.user.email + "-details").valueChanges().subscribe(
      data => {
        this.userName = data[0]["name"] ;
        this.listLoded = true ;
      });
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
