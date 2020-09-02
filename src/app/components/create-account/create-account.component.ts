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
      name: new FormControl(null, [Validators.required,Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.email,Validators.required]),
      password1: new FormControl(null, [Validators.minLength(8),Validators.maxLength(15), Validators.required]),
      password2: new FormControl(null, [Validators.minLength(8),Validators.maxLength(15), Validators.required]),
      phone: new FormControl(null, Validators.minLength(10)),
      alies: new FormControl(null)
    })
  }
  onSubmit(){
    let form = this.createAccountForm.controls ;
    if( (form.password1.value == form.password2.value) && form.valid){
      console.log('form valid!');
      
    }
    else console.log('form not valid')    
    console.log(form.password2.value);
    
  }

}
