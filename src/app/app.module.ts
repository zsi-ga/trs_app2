import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { QuestionScComponent } from './components/question-sc/question-sc.component';
import { QuestionTcComponent } from './components/question-tc/question-tc.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './components/logout/logout.component';
import { FinishComponent } from './components/finish/finish.component';
import { ResultComponent } from './components/result/result.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    QuestionScComponent,
    QuestionTcComponent,
    LogoutComponent,
    FinishComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    MessagesModule,
    RouterModule,
    FormsModule,
    DropdownModule 

  ],
  providers: [MessageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
