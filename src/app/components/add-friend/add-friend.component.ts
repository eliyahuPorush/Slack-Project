import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { Friend } from 'src/app/models/friend.model';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  addFriendForm: FormGroup ;
  constructor( private friendDataSRV: FriendsDataService) { }

  ngOnInit(): void {
  this.addFriendForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required,Validators.email])
  })    
  }
  onSubmit(){
 
  if(this.addFriendForm.valid){
    let newFriend = new Friend(this.addFriendForm.controls.name.value, this.addFriendForm.controls.email.value) ;
    this.friendDataSRV.addFriend(newFriend) ;
    this.addFriendForm.reset() ;
  }
    
  }
}
