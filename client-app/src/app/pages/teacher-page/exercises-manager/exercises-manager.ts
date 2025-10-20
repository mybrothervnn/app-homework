import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-exercises-manager',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatIconModule, MatInputModule],
  templateUrl: './exercises-manager.html',
  styleUrl: './exercises-manager.css'
})
export class ExercisesManager {
  public resultTest = '';
  public classLevel = '10';
  subjects = [
    { name: 'Toán', lessons: ['Hàm số', 'Hệ thức lượng', 'Tổ hợp', 'Xác suất'] },
    { name: 'Vật lý', lessons: ['Cơ học', 'Điện học', 'Quang học'] },
    { name: 'Hóa học', lessons: ['Hóa hữu cơ', 'Hóa vô cơ'] }
  ];

  selectedSubject: any = null;
  lessons: string[] = [];
  selectedLesson: string | null = null;
  exerciseDescription: string = '';
  question: string = `Toán 10 Tập 1 Kết nối tri thức với cuộc sống 
		- Chương Hệ thức lượng trong tam giác 
		- bài 5: Giá trị lượng giác của 1 góc từ 0 đến 180 độ.`;


  onSubjectChange() {
    this.lessons = this.selectedSubject ? this.selectedSubject.lessons : [];
    this.selectedLesson = null;
  }

  constructor(private snackBar: MatSnackBar, private apiService: QuestionService, private cdr: ChangeDetectorRef) {}

  createExercise() {    
    if (this.selectedLesson) this.question = 'Tạo câu hỏi trắc nghiệm về bài học: ' + this.selectedLesson + ' thuộc môn ' + this.selectedSubject.name + ' lớp ' + this.classLevel;
    if (this.exerciseDescription) this.question = this.exerciseDescription;

    this.apiService.getQuestionsFullText(this.question).subscribe({
        next: (data) => {
          this.resultApi(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    // Giả lập tạo bài tập thành công

    // this.snackBar.open('Bài tập đã được tạo thành công!', 'Đóng', {
    //   duration: 2000,
    //   panelClass: ['mat-toolbar', 'mat-primary']
    // });
  }
  resultApi(data: any) {
    this.resultTest = JSON.stringify(data);
    this.cdr.detectChanges();
    console.log('câu hỏi gửi đến AI để tạo bài tập:', this.question);
    console.log('Kết quả từ API:', data);
    this.snackBar.open(`${data ? data.length : 0} Bài tập đã được tạo thành công!`, 'Đóng', {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  isDisableBtn() {
    if (this.exerciseDescription) return false;
    if (this.selectedLesson) return false;
    return true;
  }
}
