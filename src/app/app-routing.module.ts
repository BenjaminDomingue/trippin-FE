import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/map-display/login-page/login-page.component';
import { UserPageComponent } from './pages/map-display/user-page/user-page.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
