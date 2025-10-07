import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { QuestionService } from '../../services/question.service';


@Component({
  selector: 'app-quiz',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnInit {
  listQuestions: any[] = [];
  currQuestion = {
    text: 'Nội dung câu hỏi',
    options: [
      'Câu trả lời 1',
      'Câu trả lời 2',
      'Câu trả lời 3',
      'Câu trả lời 4'
    ],
    answer: 1 // chỉ số đáp án đúng
  };

  selectedOption: number | null = null;
  isAnswered = false;

  constructor(
    public apiService: QuestionService
  ) {}

  ngOnInit() {    
     
  }
  nextQuestion() {
    this.currQuestion = {
      text: '',
      options: [        
      ],
      answer: 1
    };
    this.isAnswered = false;
    this.selectedOption = null;
    if(this.listQuestions.length > 0 && this.currQuestion.text != this.listQuestions[this.listQuestions.length-1]?.text){
      this.currQuestion = this.listQuestions.shift();
    } else {
      //call api to get more questions
      let monhoc = 'toán lớp 10';
      let topic = 'Tập hợp';
      this.apiService.getQuestions(topic, monhoc).subscribe({
        next: (data) => {
          this.resultApi(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }
  resultApi(data: any) {
    console.log("Dữ liệu: ",data);
    this.listQuestions = data;
    this.currQuestion = this.listQuestions[0];    

  }
  selectOption(index: number) {
    this.selectedOption = index;
    this.isAnswered = true;
  }

}
