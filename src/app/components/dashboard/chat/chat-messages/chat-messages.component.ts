import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsDataService } from 'src/app/services/friends-data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages:Observable<any> ;
  constructor(
    private activeRoute: ActivatedRoute,
    private friendSRV: FriendsDataService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      (params: Params) => {
    this.messages = this.friendSRV.getFriendMessages(params['friend'])
  })
}

}
