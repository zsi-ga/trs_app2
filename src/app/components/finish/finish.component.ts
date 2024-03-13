import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  fullName: string;
  email: string;
  fullClass: string;
  result_tc?: number;
  scores?: { name: string, score: number }[];
  totalSchoolPoints?: number;
}

interface ClassGroup {
  class: string;
  registrations: number;
  totalSchoolPoints: number;
  averageSchoolPoints: number;
  classification: string;
}

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  classGroups: ClassGroup[] = [];
  classes = [
    { 'name': 'SZOFT I/1/N' },
    { 'name': 'SZOFT I/2/N' },
    { 'name': 'SZOFT II/1/N' },
    { 'name': 'SZOFT II/2/N' },
    { 'name': 'SZOFT I/1/E' },
    { 'name': 'SZOFT I/2/E' },
    { 'name': 'SZOFT I/3/E' },
    { 'name': 'SZOFT I/4/E' },
    { 'name': 'SZOFT II/1/E' },
    { 'name': 'SZOFT II/2/E' },
    { 'name': 'VÜGY I/N' },
    { 'name': 'LOG I/N' },
    { 'name': 'KER I/N' },
    { 'name': 'PSZU I/N' },
    { 'name': 'LOG II/N' },
    { 'name': 'TURSZ II/N' },
    { 'name': 'KER II/N' },
    { 'name': 'IVEZ I/E' },
    { 'name': 'PSZU I/1/E' },
    { 'name': 'PSZU I/2/E' },
    { 'name': 'PSZU I/3/E' },
    { 'name': 'VÜGY I/E' },
    { 'name': 'KER I/E' },
    { 'name': 'PSZU II/E' },
    { 'name': 'VÜGY II/E' },
    { 'name': 'LOG II/E' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data: any[]) => {
        const results: UserData[] = data.map(item => {
          const result_tc: number | undefined = item.result_tc;
          let totalSchoolPoints = 0;

          
          if (item.result_tc !== undefined) {
            totalSchoolPoints += item.result_tc;
          }
          if (item.scores !== undefined) {
           
            if (typeof item.scores === 'object' && Object.keys(item.scores).length > 0) {
              
              Object.values(item.scores).forEach(value => {
                if (typeof value === 'number' && !isNaN(value)) {
                  totalSchoolPoints += value;
                }
              });
            }
          }

          return {
            fullName: item.fullName,
            email: item.email,
            fullClass: item.fullClass?.name || '',
            result_tc: result_tc,
            totalSchoolPoints: totalSchoolPoints
          };
        });

        this.groupResultsByClass(results);
      },
      (error) => {
        console.log('Error occurred while fetching data:', error);
      }
    );
  }





  groupResultsByClass(results: UserData[]) {
    const classMap: { [className: string]: { totalSchoolPoints: number; registrations: number } } = {};

    results.forEach(result => {
      if (this.classes.some(c => c.name === result.fullClass)) {
        if (!classMap[result.fullClass]) {
          classMap[result.fullClass] = { totalSchoolPoints: 0, registrations: 0 };
        }

        if (result.totalSchoolPoints !== undefined) {
          classMap[result.fullClass].totalSchoolPoints += result.totalSchoolPoints;
          classMap[result.fullClass].registrations++;
        }
      }
    });

    Object.keys(classMap).forEach(className => {
      const totalSchoolPoints = classMap[className].totalSchoolPoints;
      const registrations = classMap[className].registrations;
      const averageSchoolPoints = registrations > 0 ? totalSchoolPoints / registrations : 0;
      let classification = '';

      if (averageSchoolPoints >= 41) {
        classification = 'kiváló';
      } else if (averageSchoolPoints >= 31) {
        classification = 'jó';
      } else if (averageSchoolPoints >= 21) {
        classification = 'közepes';
      } else if (averageSchoolPoints >= 11) {
        classification = 'elégséges';
      } else {
        classification = 'rossz';
      }

      this.classGroups.push({
        class: className,
        registrations: registrations,
        totalSchoolPoints: totalSchoolPoints,
        averageSchoolPoints: averageSchoolPoints,
        classification: classification
      });
    });
  }
}




