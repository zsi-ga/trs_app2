import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserData2 } from 'src/app/interfaces/userdata2';




@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  registrations: number = 0;
  results: UserData2[] = [];
  scoresData: { name: string, score: number }[] = [];
  results_tc: never[] | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.registrations = params['registrations'];
    });

    this.refreshData(); 
  }

  refreshData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data: any[]) => {
        this.results = data.map(item => {
          const scores = [];
          let result_tc: number | null = null;

          if (item.hasOwnProperty('result_tc')) {
            const rawResultTc = item.result_tc;
            if (rawResultTc !== 0) {
              result_tc = rawResultTc;
            }
          }

          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && key !== 'id' && key !== 'fullName' && key !== 'email' && key !== 'fullClass' && key !== 'password' && key !== 'result_tc') {
              const score = item[key];
              if (key !== 'result_tc' && score !== 0) {
                scores.push({ name: key, score: score });
              }
            }
          }

          let fullClass = '';
          if (item.fullClass && item.fullClass.name) {
            fullClass = item.fullClass.name;
          }

          return {
            fullName: item.fullName,
            email: item.email,
            fullClass: fullClass,
            result_tc: result_tc,
            scores: scores
          };
        });

        this.registrations = this.results.filter(item => item.email).length;
      },
      (error) => {
        console.log('Hiba történt az adatok lekérése közben:', error);
      }
    );
  }
  
  onRefreshClick() {
    this.refreshData();
  }

  navigateToHome() {
    this.router.navigate(['/']); 
  }
}


