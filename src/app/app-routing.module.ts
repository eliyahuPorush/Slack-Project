import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelfDetailsComponent } from './components/self-details/self-details.component';
import { PathGuardGuard } from './services/path-guard.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard' , component: DashboardComponent, canActivate: [PathGuardGuard] },
  { path: 'details', component: SelfDetailsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  

  // last one 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
