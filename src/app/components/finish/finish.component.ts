import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../result/result.component';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  users: UserData[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.http.get<UserData[]>('http://localhost:3000/users').subscribe(
      (data: UserData[]) => {
        this.users = data;
      },
      (error) => {
        console.log('Hiba történt az adatok lekérése közben:', error);
      }
    );
  }
}
