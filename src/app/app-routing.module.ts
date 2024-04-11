import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { QuestionTcComponent } from './components/question-tc/question-tc.component';
import { QuestionScComponent } from './components/question-sc/question-sc.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResultComponent } from './components/result/result.component'; 
import { FinishComponent } from './components/finish/finish.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'question-tc', component: QuestionTcComponent, canActivate: [AuthGuard] },
  { path: 'question-sc', component: QuestionScComponent,canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent,canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent,canActivate: [AuthGuard] },
  { path: 'finish', component: FinishComponent, canActivate: [AuthGuard] },
  
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
