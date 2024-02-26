import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question-tc',
  templateUrl: './question-tc.component.html',
  styleUrls: ['./question-tc.component.css']
})
export class QuestionTcComponent implements OnInit {
  questions: Question[] = [
    { text: 'A képzés tartalma összhangban van az általam előzetesen elvárt tartalommal, melyet például a honlapon találtam.', score: 0 },
    { text: 'Az iskolának a képzés megszervezésével összefüggő kezdeti tevékenységével elégedett vagyok.', score: 0 },
    { text: 'A képzés tárgyi feltételeivel (berendezés, fűtés, világítás, higiénia) elégedett vagyok.', score: 0 },
    { text: 'A képzés digitális feltételeivel (eKréta napló, Google Classroom, honlap) elégedett vagyok.', score: 0 },
    { text: 'Számomra megfelelő az előírt tananyag átvétele részben a jelenléti órákon történő közös részvétellel, részben pedig a Google Classroomban kiadott feladatok önálló elvégzésével.', score: 0 },
    { text: 'Véleményem szerint az iskola kellő figyelmet fordít a tanórákon kívüli fakultatív programok szervezésére.', score: 0 },
    { text: 'Az iskola ügyfélszolgálati (iskolatitkársági) tevékenységével elégedett vagyok.', score: 0 },
    { text: 'A képzés összességében megfelel az elvárásaimnak, mivel véleményem szerint kellő segítséget kapok az Ágazati alapvizsgára és a Szakmai vizsgára történő felkészüléshez.', score: 0 },
    { text: 'Véleményem szerint az Egybefüggő szakmai gyakorlat teljesítéséhez kellő útmutatást biztosít az intézmény.', score: 0 },
    { text: 'Véleményem szerint a Portfólió-feladatok teljesítéséhez megfelelő támogatást nyújt az intézmény.', score: 0 },
  ];

  totalScore: number = 0;
  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.getAllDataFromDatabase();
  }

  getAllDataFromDatabase() {
    this.authService.getAllData().subscribe((userData: any) => {
      this.user.fullName = userData.fullName;
      this.user.email = userData.email;
      this.user.fullClass = userData.fullClass;
    });
  }

  updateScore(question: Question, event: any) {
    question.score = parseInt(event.target.value);
    this.calculateTotalScore();
  }

  calculateTotalScore() {
    this.totalScore = this.questions.reduce((acc, curr) => acc + curr.score, 0);
  }

  saveResults() {
    console.log('Eredmények mentése...');

    this.calculateTotalScore();
    this.user.result_tc = this.totalScore;

    this.authService.saveUserResults(this.user).subscribe(() => {
      this.router.navigate(['/question-sc']);
    });
  }
}
