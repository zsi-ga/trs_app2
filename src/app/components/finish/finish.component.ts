import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent {

  constructor(private router: Router) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}


