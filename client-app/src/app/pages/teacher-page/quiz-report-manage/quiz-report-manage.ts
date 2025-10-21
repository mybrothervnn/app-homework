import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

interface QuizReport {
  studentName: string;
  class: string;
  subject: string;
  date: string; // ISO date string
  score: number;
}

@Component({
  selector: 'app-quiz-report-manage',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './quiz-report-manage.html',
  styleUrls: ['./quiz-report-manage.css'],
  providers: [DatePipe]
})
export class QuizReportmanageComponent {
  classList = ['10A1', '10A2', '11B1', '11B2'];
  subjectList = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa'];
  selectedClass = this.classList[0];
  selectedSubject = this.subjectList[0];
  fromDate = '';
  toDate = '';
  reportData: QuizReport[] = [];

  // Demo data
  allReports: QuizReport[] = [
    { studentName: 'Nguyễn Văn A', class: '10A1', subject: 'Toán', date: '2025-10-10', score: 8 },
    { studentName: 'Trần Thị B', class: '10A1', subject: 'Văn', date: '2025-10-11', score: 7 },
    { studentName: 'Lê Văn C', class: '11B1', subject: 'Toán', date: '2025-10-12', score: 9 },
    // ... thêm dữ liệu mẫu nếu cần
  ];

  onFilter() {
    this.reportData = this.allReports.filter(r =>
      r.class === this.selectedClass &&
      r.subject === this.selectedSubject &&
      r.date >= this.fromDate &&
      r.date <= this.toDate
    );
  }
}