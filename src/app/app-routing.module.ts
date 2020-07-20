import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelfDetailsComponent } from './components/self-details/self-details.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard' , component: DashboardComponent },
  { path: 'details', component: SelfDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
