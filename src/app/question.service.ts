import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: string[] = []; 

  constructor() { }

 
  addQuestion(question: string): void {
    this.questions.push(question);
  }


  getQuestions(): string[] {
    return this.questions;
  }


  deleteQuestion(index: number): void {
    this.questions.splice(index, 1);
  }
}
