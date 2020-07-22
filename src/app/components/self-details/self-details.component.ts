import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersDataService } from 'src/app/services/users-data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-self-details',
  templateUrl: './self-details.component.html',
  styleUrls: ['./self-details.component.css']
})
export class SelfDetailsComponent implements OnInit {
  user: User ;
  details: FormGroup ;
  constructor(
    private data: UsersDataService,
    private router: Router,
    private authSRV: AuthService
    ) { }

  ngOnInit(): void {
   
    this.details = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      imageURL: new FormControl(null),
    }) ;
    this.user = this.authSRV.getUser() ;
  }
  onSubmit(){
    let details = this.details.controls ;
    this.data.updateProfile(details['name'].value, details['imageURL'].value) ;
    this.router.navigate([this.user.email, 'dashboard'])
  }
}
