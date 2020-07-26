import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private DB: AngularFirestore){}
  title = 'Slack-Project';
  obs: Observable<any> ;
  ngOnInit(): void {  
    
  }

}
