import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  

interface TeacherResult {
  teacherName: string;
  teacherPoints: number;
  classification?: string;
}

interface UserData {
  fullName: string;
  email: string;
  totalSchoolPoints: number;
  teacherResults: TeacherResult[];
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
button: any;

  constructor(private http: HttpClient, private router: Router) {}  

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      data => {
        const classMap: { [className: string]: ClassGroup } = {};
        let currentClassGroup: ClassGroup | null = null;
  
        data.forEach(item => {
          if (item.email) {
           
            const className = item.fullClass && typeof item.fullClass === 'object' ? item.fullClass.name : item.fullClass;
            if (!className) {
              return;
            }
  
            if (!classMap[className]) {
              classMap[className] = {
                class: className,
                registrations: 1,
                totalSchoolPoints: item.result_tc || 0,
                averageSchoolPoints: 0,
                classification: '',
                studentData: [{
                  fullName: item.fullName,
                  email: item.email,
                  totalSchoolPoints: item.result_tc || 0,
                  teacherResults: []
                }]
              };
            } else {
              classMap[className].registrations++;
              classMap[className].studentData.push({
                fullName: item.fullName,
                email: item.email,
                totalSchoolPoints: item.result_tc || 0,
                teacherResults: []
              });
              classMap[className].totalSchoolPoints += item.result_tc || 0;
            }
  
            currentClassGroup = classMap[className];
          } else if (currentClassGroup) {
            const lastStudent = currentClassGroup.studentData[currentClassGroup.studentData.length - 1];
            for (const key in item) {
              if (!['id', 'email', 'fullName', 'fullClass', 'password'].includes(key)) {
                if (key === 'result_tc') {
                  lastStudent.totalSchoolPoints += item[key];
                  currentClassGroup.totalSchoolPoints += item[key];
                } else {
                  lastStudent.teacherResults.push({
                    teacherName: key,
                    teacherPoints: item[key]
                  });
                }
              }
            }
          }
        });
  
        Object.values(classMap).forEach(classGroup => {
          if (classGroup.registrations > 0) {
            classGroup.averageSchoolPoints = classGroup.totalSchoolPoints / classGroup.registrations;
            classGroup.classification = this.getClassification(classGroup.averageSchoolPoints);
          }
        });
  
        this.classGroups = Object.values(classMap);
      },
      error => {
        console.error('Error occurred while fetching data:', error);
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

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
    
   
}
