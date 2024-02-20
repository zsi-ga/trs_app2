import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question-sc',
  templateUrl: './question-sc.component.html',
  styleUrls: ['./question-sc.component.css']
})
export class QuestionScComponent {
  questions: Question[] = [
    { text: 'Az oktató mindig pontosan kezdi és fejezi be a tanórát.', score: 0 },
    { text: 'Véleményem szerint a rendelkezésre álló időt megfelelően kihasználjuk, mert az oktató mindig hasznos és érdekes órákat tart.', score: 0 },
    { text: 'Az oktató magyarázatai számomra érthetők, beszédtempója követhető.', score: 0 },
    { text: 'Véleményem szerint megfelelő mennyiségű és tartalmú tananyagot biztosít az oktató ahhoz, hogy a tantárgy követelményeit teljesíteni tudjam.', score: 0 },
    { text: 'Az órákon az oktató bevonja a tanulókat a tanulás folyamatába, előadásai mellett változatosan végzünk önálló, pár- és csoportmunkát is.', score: 0 },
    { text: 'Ismerem a munkám, az elvégzendő feladataim értékelési szempontjait, és teljesítményemről mindig megfelelő visszajelzést kapok (pl. jegyek vagy szöveges értékelés formájában).', score: 0 },
    { text: 'Véleményem szerint az oktató megfelelően használja az iskola Google Classroomját (a tananyagok megosztása, a feladatok kiosztása, a számonkérések bonyolítása és az értékelések/visszajelzések adása szempontjából).', score: 0 },
    { text: 'Az oktatás/tanulás során felmerülő problémákat az oktatóval közösen meg tudjuk oldani.', score: 0 },
  ];

  options = [
    { label: '', value: 0 },
    { label: 'Oktató_1', value: 1, disabled: false },
    { label: 'Oktató_2', value: 2, disabled: false },
    { label: 'Oktató_3', value: 3, disabled: false },
    { label: 'Oktató_4', value: 4, disabled: false },
    { label: 'Oktató_5', value: 5, disabled: false },
    { label: 'Oktató_6', value: 6, disabled: false },
    { label: 'Oktató_7', value: 7, disabled: false },
    { label: 'Oktató_8', value: 8, disabled: false },
    { label: 'Oktató_9', value: 9, disabled: false },
    { label: 'Oktató_10', value: 10, disabled: false },
  ];

  selectedScore: number = 0;
  totalScore: number = 0;
  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  updateSelectedScore() {
    this.questions.forEach(question => {
      question.score = this.selectedScore === 0 ? 0 : this.selectedScore - 1;
    });
    this.calculateTotalScore();
    
    this.options.splice(this.selectedScore, 1);
  }

  calculateTotalScore() {
    this.totalScore = this.questions.reduce((acc, curr) => acc + curr.score, 0);
  }

  saveResults() {
    console.log('Eredmények mentése...');
  
    this.calculateTotalScore();
  
    const selectedInstructor = `oktato_${this.selectedScore}`;
  
   
    const resultObject = {
      id: this.user.id,
      result_tc: this.totalScore,
      result_sc: this.totalScore,
      [selectedInstructor]: this.totalScore
    };
  
    console.log('Eredmények:', resultObject);
  
  
    this.authService.saveUserResults(resultObject).subscribe(() => {
      console.log('Eredmények sikeresen mentve.');
      this.router.navigate(['/question-sc']);
    });
  }
}