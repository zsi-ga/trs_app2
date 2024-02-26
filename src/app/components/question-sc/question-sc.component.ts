import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question-sc',
  templateUrl: './question-sc.component.html',
  styleUrls: ['./question-sc.component.css']
})
export class QuestionScComponent implements OnInit {
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

  options = Array.from({length: 11}, (_, i) => {
    if (i === 0) {
      return { label: '', value: i, disabled: false };
    } else {
      return { label: `Oktató_${i}`, value: i, disabled: false };
    }
  });

  selectedScore: number = 0;
  totalScore: number = 0;
  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  updateSelectedScore() {
    if (this.selectedScore === 0) return;

    const selectedInstructorIndex = this.selectedScore;

    this.questions.forEach(question => {
      question.score = selectedInstructorIndex - 1;
    });

    this.calculateTotalScore();
    
    // Kikapcsoljuk a kiválasztott oktatót az opciók között
    const selectedInstructorLabel = `Oktató_${selectedInstructorIndex}`;
    const selectedOption = this.options.find(option => option.label === selectedInstructorLabel);
    if (selectedOption) {
      selectedOption.disabled = true;
    }
  }

  calculateTotalScore() {
    this.totalScore = this.questions.reduce((acc, curr) => acc + curr.score, 0);
  }

  saveResults() {
    console.log('Eredmények mentése...');
  
    this.calculateTotalScore();
  
    const selectedInstructorIndex = this.selectedScore;
    const selectedInstructorLabel = `Oktató_${selectedInstructorIndex}`;
  
    this.user.result_tc = this.totalScore;
    this.user.result_sc = this.totalScore;
    this.user[selectedInstructorLabel] = this.totalScore;
  
    console.log('Eredmények:', this.user);
  
    this.authService.saveUserResults(this.user).subscribe(() => {
      console.log('Eredmények sikeresen mentve.');
    });
  }

  saveResultsAndLogout() {
    console.log('Eredmények mentése és kijelentkezés...');
  
    this.calculateTotalScore();
  
    const selectedInstructorIndex = this.selectedScore;
    const selectedInstructorLabel = `Oktató_${selectedInstructorIndex}`;
  
    this.user.result_tc = this.totalScore;
    this.user.result_sc = this.totalScore;
    this.user[selectedInstructorLabel] = this.totalScore;
  
    console.log('Eredmények:', this.user);
  
    this.authService.saveUserResults(this.user).subscribe(() => {
      console.log('Eredmények sikeresen mentve és kijelentkezve.');
      
      
      this.authService.logOut();
      
      
      this.router.navigate(['/logout']);
    });
  }
}
