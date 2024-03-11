import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  fullName: string;
  email: string;
  fullClass: { name: string };
  result_tc: number;
 
}

interface ClassSummary {
  className: string;
  registrations: number;
  totalSchoolPoints: number;
}



@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  classSummaries: ClassSummary[] = [];
result: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.http.get<UserData[]>('http://localhost:3000/users').subscribe(
      (data: UserData[]) => {
        this.classSummaries = this.generateClassSummaries(data);
      },
      (error) => {
        console.log('Hiba történt az adatok lekérése közben:', error);
      }
    );
  }

generateClassSummaries(data: UserData[]): ClassSummary[] {
  const classMap: { [className: string]: ClassSummary } = {};

  data.forEach(user => {
    const className = user.fullClass?.name;
    if (!className) return;

    if (!classMap[className]) {
      classMap[className] = {
        className: className,
        registrations: 0,
        totalSchoolPoints: 0,
      };
    }

    classMap[className].registrations++;
    if (user.result_tc !== undefined) { 
      classMap[className].totalSchoolPoints += user.result_tc;
    }
  });

  return Object.values(classMap);
}

}  