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

  instructorNames: string[] = [
    'Bakos András', 'Bálint Dezső', 'Bedő Gertrúd', 'Bódai Károly', 'Czibolyáné Nagy Anna',
    'Csomár Tünde', 'dr. Orosz Róza', 'Drávay Kinga', 'Eszterhai Judit', 'Feráné Gősi Ildikó',
    'Fischer-Deeks, Ben', 'Fügedi Beatrix', 'Füzeséri Mihály', 'García de Quirós, Susana',
    'Hanzliné Farkas Valéria', 'Hoffmann Vilmos', 'Horváth Boglárka', 'Illés Marianna',
    'Jáger Attila', 'Józsa Béla', 'Kabar Judit', 'Kállai Zsuzsanna', 'Kasnyik Marianna',
    'Kelemen Károly', 'Kocsis Zsuzsanna', 'Koós-Harmat Zsuzsanna', 'Kopp Kristóf',
    'Kovács Bence', 'Krain (Havas) Edina', 'Kupovits Andrea', 'Mály Balázs', 'Mészáros Sándor',
    'Némon Zoltán', 'Onódi Ákos', 'Őze-Ottohál Zsuzsa', 'Polyák Anita', 'Rádics András',
    'Rékási József', 'Rocca, Enrica', 'Sallai András', 'Sarkadi Sándor', 'Szatmáry Judit',
    'Szendéné Koltai Ágnes', 'Szommer Ágnes', 'Togyerisko Erika', 'Togyerisko Erika',
    'Vadász László', 'Vándorffy István', 'Veréb Zsolt', 'Vida Ágnes', 'Vinkler Judit', 'Volák Mária'
];

  options = this.instructorNames.map((name, index) => {
    return { label: name, value: index + 1, disabled: false };
  });

  selectedScore: number = 0;
  totalScore: number = 0;
  user: any = {};
  tempUser: any = {}; 

  instructorResults: { [key: string]: number } = {};

  constructor(private router: Router, private authService: AuthService) {
    this.updateSelectedScore();
  }

  ngOnInit() {}

  updateSelectedScore() {
    if (this.selectedScore === 0) return;
  
    const selectedInstructorLabel = this.instructorNames[this.selectedScore - 1];
  
   
    if (!(selectedInstructorLabel in this.instructorResults)) {
      const selectedOption = this.options.find(option => option.label === selectedInstructorLabel);
      if (selectedOption) {
        selectedOption.disabled = true;
      }
  
      this.tempUser[selectedInstructorLabel] = this.selectedScore;
     
    }

    
  }

  

  calculateTotalScore() {
    this.totalScore = this.questions.reduce((acc, curr) => acc + curr.score, 0);
  }

  saveResults() {
    console.log('Eredmények ideiglenes tárolása...');

    this.updateSelectedScore();
    this.calculateTotalScore();

    const selectedInstructorLabel = this.instructorNames[this.selectedScore - 1];

    
    this.tempUser[selectedInstructorLabel] = this.totalScore;
    this.instructorResults[selectedInstructorLabel] = this.totalScore;

    console.log('Ideiglenes eredmények:', this.tempUser);
  }

  saveResultsAndLogout() {
    console.log('Eredmények mentése és kijelentkezés...');
  
   
    const selectedInstructorLabel = this.instructorNames[this.selectedScore - 1];
  
    
    if (!(selectedInstructorLabel in this.tempUser)) {
      this.tempUser[selectedInstructorLabel] = this.totalScore;
    }
  
    
    this.authService.saveUserResults(this.tempUser).subscribe(() => {
      console.log('Eredmények sikeresen mentve és kijelentkezve.');
  
      
      this.authService.logOut();
      this.router.navigate(['/logout']);
    });
  }
  
}
