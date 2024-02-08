import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() { 
    return this.loginForm.controls['password']; 
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.msgService.add({ severity: 'error', summary: 'Hiba!', detail: 'Kérem, töltse ki az összes mezőt helyesen.' });
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.msgService.add({ severity: 'success', summary: 'Sikeres bejelentkezés', detail: 'Üdvözöljük!' });
          this.router.navigate(['/home']);
        } else {
          this.msgService.add({ severity: 'error', summary: 'Hiba!', detail: 'Hibás email cím vagy jelszó.' });
        }
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Hiba!', detail: 'Valami nem jó' });
      }
    )
  }
}
