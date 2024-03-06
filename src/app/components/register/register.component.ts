import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/auth';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  classes = [
    { id: '1A', name: '1A' },
    { id: '2B', name: '2B' },
    { id: '3C', name: '3C' }
  ];

  selectedClass: string | undefined;

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    fullClass: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],  
  }, {
    validators: passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get fullClass() {
    return this.registerForm.controls['fullClass'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    if (this.registerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Hiba!', detail: 'Kérem, töltse ki az összes mezőt helyesen.' });
      return;
    }

    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'Sikeres regisztráció' });
        this.router.navigate(['login']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Hiba', detail: 'Hiba történt' });
      }
    );
  }
}



