import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getUserByEmail(_email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${_email}`);
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
}