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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
