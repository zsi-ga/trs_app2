import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionScComponent } from './question-sc.component';

describe('QuestionScComponent', () => {
  let component: QuestionScComponent;
  let fixture: ComponentFixture<QuestionScComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionScComponent]
    });
    fixture = TestBed.createComponent(QuestionScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
