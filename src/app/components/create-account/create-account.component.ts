import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup ;
  constructor() { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(null, Validators.email),
      phone: new FormControl(),
      alies: new FormControl()
    })
  }
  onSubmit(){}

}
