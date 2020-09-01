import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup ;
  user: User ;
  constructor(private authSRV: AuthService) { }

  ngOnInit(): void {
    this.user = this.authSRV.getUser() ;
    this.profileForm = new FormGroup({
          name: new FormControl(this.user.displayName),
          email: new FormControl(this.user.email),
          phone: new FormControl(this.user.phone)
    })
  }
  onSubmit(){
    console.log(this.profileForm.controls);
    

  }
}
