import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-self-details',
  templateUrl: './self-details.component.html',
  styleUrls: ['./self-details.component.css']
})
export class SelfDetailsComponent implements OnInit {

  details: FormGroup ;
  constructor(private data: UsersDataService) { }

  ngOnInit(): void {
    this.details = new FormGroup({
      name: new FormControl(null),
      imageURL: new FormControl(null),
    })
  }
  onSubmit(){
    let details = this.details.controls ;
    this.data.updateProfile(details['name'].value, details['imageURL'].value)
  }
}
