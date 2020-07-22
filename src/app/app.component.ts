import { Component } from '@angular/core';
import { Friend } from './models/friend.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slack-Project';
  friends: Friend[] ;
  constructor(){
    this.friends = [
     // ////////////////////////////////////////////////////////
    ]
  }
}
