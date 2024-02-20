import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logOut() {
    throw new Error('Method not implemented.');
  }

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

  updateAllData(result_tc: User): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users`);
  }

  
    
}



