import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { PupilService } from '../../../services/pupil.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-quiz',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnInit {
  listQuestions: any[] = [];
  currQuestion: any;
  currQuestionIndex = 0;

  selectedOption: number | null = null;
  isAnswered = false;

  constructor(
    public questionService: QuestionService,
    private cdr: ChangeDetectorRef,
    public pupilService: PupilService
  ) { }

  ngOnInit() {
    //Đọc dữ liệu từ API để lấy danh sách câu hỏi từ bảng quiz_temp
    this.questionService.getQuizsList().subscribe({
      next: (data) => {
        console.log("Data nhận được: ", data);
        this.listQuestions = data;
        this.currQuestion = this.listQuestions[0];
        console.log("currQuestion: ", this.currQuestion);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  preQuestion() {
    this.isAnswered = false;
    this.selectedOption = null;

    this.currQuestionIndex--;
    if (this.currQuestionIndex === -1)
      this.currQuestionIndex = this.listQuestions.length - 1;

    this.currQuestion = this.listQuestions[this.currQuestionIndex];
    this.cdr.detectChanges();
  }
  nextQuestion() {
    this.isAnswered = false;
    this.selectedOption = null;

    this.currQuestionIndex++;
    if (this.currQuestionIndex === this.listQuestions.length)
      this.currQuestionIndex = 0;

    this.currQuestion = this.listQuestions[this.currQuestionIndex];
    this.cdr.detectChanges();

    // this.currQuestion = {
    //   text: '',
    //   options: [        
    //   ],
    //   answer: 1
    // };
    // this.isAnswered = false;
    // this.selectedOption = null;
    // if(this.listQuestions.length > 0 && this.currQuestion.text != this.listQuestions[this.listQuestions.length-1]?.text){
    //   this.currQuestion = this.listQuestions.shift();
    // } else {
    //   //call api to get more questions
    //   let monhoc = 'toán lớp 10';
    //   let topic = 'Tập hợp';
    //   this.questionService.getQuestions(topic, monhoc).subscribe({
    //     next: (data) => {
    //       this.resultApi(data);
    //     },
    //     error: (error) => {
    //       console.error('There was an error!', error);
    //     }
    //   });
    // }
  }
  resultApi(data: any) {
    console.log("Dữ liệu: ", data);
    this.listQuestions = data;
    this.currQuestion = this.listQuestions[0];

  }
  selectOption(index: number) {
    this.selectedOption = index;
    this.isAnswered = true;
  }

}
