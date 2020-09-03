import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup ;
  user: firebase.User ;
  constructor(private authSRV: AuthService) { }

  ngOnInit(): void {
    this.user = this.authSRV.getUser() ;
    this.profileForm = new FormGroup({
          name: new FormControl(this.user.displayName),
          email: new FormControl(this.user.email, Validators.email),
          phone: new FormControl(this.user.phoneNumber),
          alies: new FormControl(null)
    })
  }
  onSubmit(){
    let contols = this.profileForm.controls ;
    let selectedFile: File ;
    selectedFile = this.profileForm.controls['alies']['value'] as File ;  
    // const uploadFile = new FormData() ;
    // uploadFile.append('alies', selectedFile, selectedFile.name) ;
    this.authSRV.updateProfile(contols.name.value, "", contols.email.value, contols.phone.value, selectedFile)
    console.log(this.profileForm.controls);
    

  }
}
