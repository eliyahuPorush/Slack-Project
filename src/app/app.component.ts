import { Component } from '@angular/core';
import { Friend } from './models/friend.model';
import { Message } from './models/message.model';
import { FriendsDataService } from './services/friends-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slack-Project';

}
