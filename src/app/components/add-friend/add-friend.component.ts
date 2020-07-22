import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  addFriendForm: FormGroup ;
  constructor() { }

  ngOnInit(): void {
  this.addFriendForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required,Validators.email])
  })    
  }
  onSubmit(){
 
  if(this.addFriendForm.valid){
    
  }
    
  }
}
