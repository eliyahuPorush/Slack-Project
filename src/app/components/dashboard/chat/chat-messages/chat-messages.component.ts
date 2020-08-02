import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages:Observable<any> ;
  messagesLoded: boolean = false ;  // try to show loading spinner  --   dosent work!
  constructor(
    private activeRoute: ActivatedRoute,
    private friendSRV: FriendsDataService
  ) { }

  ngOnInit(): void {
    this.messages = this.friendSRV.getFriendMessages() ;
    this.activeRoute.queryParams.subscribe(
      () => {
    this.messages = this.friendSRV.getFriendMessages() ;
    this.messagesLoded = true ;
  })
}

}
