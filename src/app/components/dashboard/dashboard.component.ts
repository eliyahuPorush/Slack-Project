import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

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
    localStorage.setItem("key","val") ;
   this.user = this.authSRV.getUser() ;
   console.log(this.user);
   
  
  }

}
