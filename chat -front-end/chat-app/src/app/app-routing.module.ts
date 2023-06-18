import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat/:user', component: ChatComponent },
  { path: 'active-users', component: ActiveUsersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
