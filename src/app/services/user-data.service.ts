import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private resultsSource = new BehaviorSubject<any[]>([]);
  results$ = this.resultsSource.asObservable();

  constructor(private http: HttpClient) {}

  refreshData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      this.resultsSource.next(data);
    }, error => {
      console.error('Error fetching data:', error);
    });
  }
}
