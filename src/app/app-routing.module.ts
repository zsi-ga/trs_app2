import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { QuestionTcComponent } from './components/question-tc/question-tc.component';
import { QuestionScComponent } from './components/question-sc/question-sc.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResultComponent } from './components/result/result.component'; 
import { FinishComponent } from './components/finish/finish.component'; 

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'question-tc', 
    component: QuestionTcComponent
  },
  {
    path: 'question-sc', 
    component: QuestionScComponent
  },
  {
    path: 'logout', 
    component: LogoutComponent
  },
  {
    path: 'result', 
    component: ResultComponent
  },
  {
    path: 'finish', 
    component: FinishComponent
  },
  
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
