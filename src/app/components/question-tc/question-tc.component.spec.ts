import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTcComponent } from './question-tc.component';

describe('QuestionTcComponent', () => {
  let component: QuestionTcComponent;
  let fixture: ComponentFixture<QuestionTcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTcComponent]
    });
    fixture = TestBed.createComponent(QuestionTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
