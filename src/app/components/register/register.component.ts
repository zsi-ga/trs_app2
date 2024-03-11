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
    { 'name': 'SZOFT I/1/N' },
    { 'name': 'SZOFT I/2/N' },
    { 'name': 'SZOFT II/1/N' },
    { 'name': 'SZOFT II/2/N' },
    { 'name': 'SZOFT I/1/E' },
    { 'name': 'SZOFT I/2/E' },
    { 'name': 'SZOFT I/3/E' },
    { 'name': 'SZOFT I/4/E' },
    { 'name': 'SZOFT II/1/E' },
    { 'name': 'SZOFT II/2/E' },
    { 'name': 'VÜGY I/N' },
    { 'name': 'LOG I/N' },
    { 'name': 'KER I/N' },
    { 'name': 'PSZU I/N' },
    { 'name': 'LOG II/N' },
    { 'name': 'TURSZ II/N' },
    { 'name': 'KER II/N' },
    { 'name': 'IVEZ I/E' },
    { 'name': 'PSZU I/1/E' },
    { 'name': 'PSZU I/2/E' },
    { 'name': 'PSZU I/3/E' },
    { 'name': 'VÜGY I/E' },
    { 'name': 'KER I/E' },
    { 'name': 'PSZU II/E' },
    { 'name': 'VÜGY II/E' },
    { 'name': 'LOG II/E' }
]

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



