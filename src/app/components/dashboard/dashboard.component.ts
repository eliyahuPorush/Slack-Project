import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Friend } from 'src/app/models/friend.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user ;
  userName: string ;
  constructor(
    private authSRV: AuthService,
    private db: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.user = this.authSRV.getUser() ;
    this.db.collection(this.user.email + "-details").valueChanges().subscribe(
      data => {
        this.userName = data[0]["name"] ;
      });
  }

}
