import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PupilService } from '../../../services/pupil.service';

interface SubjectStat {
  key: string;
  name: string;
  total: number;
  done: number;
  correct: number;
  incorrect: number;
}

@Component({
  selector: 'app-quiz-manage',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './quiz-manage.html',
  styleUrls: ['./quiz-manage.css']
})
export class QuizManage {
  subjects: SubjectStat[] = [
    { key: 'toan', name: 'Toán', total: 120, done: 80, correct: 60, incorrect: 20 },
    { key: 'ly', name: 'Lý', total: 90, done: 50, correct: 35, incorrect: 15 },
    { key: 'hoa', name: 'Hóa', total: 100, done: 70, correct: 50, incorrect: 20 },
    // Có thể thêm các môn khác
  ];

  constructor(private router: Router,
    public pupilService: PupilService
  ) {}

  goToQuiz(subjectKey: string) {
    this.router.navigate(['/quiz'], { queryParams: { subject: subjectKey } });
  }
}