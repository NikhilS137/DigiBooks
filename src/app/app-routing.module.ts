import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { AuthorComponent } from './author/author.component';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // {path:'signup',component:SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'searchbooks', component: SearchbooksComponent },
  {path: 'author', component: AuthorComponent},
  {path: "reader", component : ReaderDashboardComponent},
  {path: "signup", component:RegisterComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
