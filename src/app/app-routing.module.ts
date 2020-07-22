import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelfDetailsComponent } from './components/self-details/self-details.component';
import { PathGuardGuard } from './services/path-guard.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: ':user_email/dashboard' , component: DashboardComponent, canActivate: [PathGuardGuard], children: [
      { path: 'chat', canActivateChild:[PathGuardGuard],component: ChatComponent},
      { path: 'add_friend', component: AddFriendComponent},
    // { path: '', redirectTo: 'chat'},
    // { path: '**', redirectTo: 'chat',canActivateChild:[PathGuardGuard], pathMatch: 'full'}
  ] },
  { path: ':user_email/details', component: SelfDetailsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  

  // last one 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
