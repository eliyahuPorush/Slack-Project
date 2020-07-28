import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms' ;
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginHeaderComponent } from './components/login/login-header/login-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersListComponent } from './components/dashboard/users-list/users-list.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';
import { SelfDetailsComponent } from './components/self-details/self-details.component';
import { ChatInputComponent } from './components/dashboard/chat/chat-input/chat-input.component';
import { ChatMessagesComponent } from './components/dashboard/chat/chat-messages/chat-messages.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginHeaderComponent,
    DashboardComponent,
    UsersListComponent,
    ChatComponent,
    SelfDetailsComponent,
    ChatInputComponent,
    ChatMessagesComponent,
    PageNotFoundComponent,
    AddFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
