import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }
  
  getAllData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }  

  saveUserResults(results: { result_tc: number; result_sc: number }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, results);
  }

  updateAllData(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users`);
  }

  logOut(): void {
    console.log('Felhasználó kijelentkezett.');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/logout']);
  }

  getUserRole(): Observable<string> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.getUserByEmail(currentUser.email).pipe(
      map(users => users.length > 0 ? users[0].role : 'guest')
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  login(email: string, password: string): Observable<User | null> {
    return this.getUserByEmail(email).pipe(
      map(users => {
        const user = users.find(u => u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(user.role === 'admin' ? ['/result'] : ['/home']);
          return user;
        } else {
         
          return null;
        }
      })
    );
  }
  
  
  

  isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.role === 'admin';
  }
}
