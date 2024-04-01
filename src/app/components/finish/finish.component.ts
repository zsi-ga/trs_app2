import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  fullName: string;
  email: string;
  totalSchoolPoints: number;
  teacherResults: { teacherName: string; teacherPoints: number }[];
}

interface ClassGroup {
  class: string;
  registrations: number;
  totalSchoolPoints: number;
  averageSchoolPoints: number;
  classification: string;
  studentData: UserData[];
}

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  classGroups: ClassGroup[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data: any[]) => {
        const classMap: { [className: string]: ClassGroup } = {};

        data.forEach(item => {
          const totalSchoolPoints: number = item.totalSchoolPoints;
          const userData: UserData = {
            fullName: item.fullName,
            email: item.email,
            totalSchoolPoints: totalSchoolPoints,
            teacherResults: item.teacherResults
          };

          if (!classMap[item.class]) {
            classMap[item.class] = {
              class: item.class,
              registrations: 0,
              totalSchoolPoints: 0,
              averageSchoolPoints: 0,
              classification: '',
              studentData: []
            };
          }

          classMap[item.class].registrations++;
          classMap[item.class].totalSchoolPoints += totalSchoolPoints;
          classMap[item.class].studentData.push(userData);
        });

        Object.values(classMap).forEach(classGroup => {
          classGroup.averageSchoolPoints = classGroup.totalSchoolPoints / classGroup.registrations;
          classGroup.classification = this.getClassification(classGroup.averageSchoolPoints);
        });

        this.classGroups = Object.values(classMap);
      },
      (error) => {
        console.log('Error occurred while fetching data:', error);
      }
    );
  }

  getClassification(totalSchoolPoints: number): string {
    if (totalSchoolPoints >= 0 && totalSchoolPoints <= 10) {
      return 'Rossz';
    } else if (totalSchoolPoints <= 20) {
      return 'Elégséges';
    } else if (totalSchoolPoints <= 30) {
      return 'Közepes';
    } else if (totalSchoolPoints <= 40) {
      return 'Jó';
    } else {
      return 'Kiváló';
    }
  }
}


