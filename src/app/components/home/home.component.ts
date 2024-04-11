import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) { }

 
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  navigateToFinish() {
    this.router.navigate(['/finish']);
  }

  navigateToQuestionSc() {
    sessionStorage.clear();
    this.router.navigate(['/question-tc']);
  }
}
