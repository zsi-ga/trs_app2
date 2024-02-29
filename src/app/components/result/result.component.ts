import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UserData {
  fullName: string;
  email: string;
  fullClass: string;
  result_tc: number;
  scores: { name: string, score: number }[];
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  registrations: number = 0;
  results: UserData[] = [];
  resultTC: number[] = [];
  scoresData: { name: string, score: number }[] = [];
  results_tc: never[] | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.registrations = params['registrations'];
    });

    this.refreshData(); 
  }

  refreshData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data: any[]) => {
        this.results = [];
        this.results_tc = [];
        this.scoresData = [];
  
        let currentUser: UserData = { fullName: '', email: '', fullClass: '', result_tc: 0, scores: [] };
        
        data.forEach(item => {
          if (item.fullName) {
            if (currentUser.fullName) {
              this.results.push(currentUser);
            }
            currentUser = {
              fullName: item.fullName,
              email: item.email,
              fullClass: item.fullClass,
              result_tc: item.result_tc,
              scores: []
            };
          } else {
            for (const key in item) {
              if (Object.prototype.hasOwnProperty.call(item, key) && key !== 'id' && key !== 'result_tc') {
                currentUser.scores.push({ name: key, score: item[key] });
              }
            }
          }
        });
  
        // Utolsó felhasználó adatainak hozzáadása
        if (currentUser.fullName) {
          this.results.push(currentUser);
        }
      },
      (error) => {
        console.log('Hiba történt az adatok lekérése közben:', error);
      }
    );
  }
  
  onRefreshClick() {
    this.refreshData();
  }

  getScoreFromScores(scores: { name: string, score: number }[], name: string): number | string {
    const foundScore = scores.find(score => score.name === name);
    return foundScore ? foundScore.score : '-';
  }
}


