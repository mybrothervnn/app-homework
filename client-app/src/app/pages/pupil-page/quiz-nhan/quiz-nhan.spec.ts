import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNhan } from './quiz-nhan';

describe('QuizNhan', () => {
  let component: QuizNhan;
  let fixture: ComponentFixture<QuizNhan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizNhan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizNhan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
