import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  
  private apiUrl = 'https://homework.vnapp.online/api/generate-quizs';
  private apiUrlQuestion = 'https://homework.vnapp.online/api/generate-questions';
  private apiUrlRoot = 'https://homework.vnapp.online/';


  // private apiUrl = 'http://localhost:3000/api/generate-quizs';
  // private apiUrlQuestion = 'http://localhost:3000/api/generate-questions';
  // private apiUrlRoot = 'http://localhost:3000/';


  constructor(private http: HttpClient) {}
  
  //tạo bộ câu hỏi và lưu vào bảng questions_temp
  // contentTitle: string = 'Toán học lớp 7 - tuần 1';
  // contentTopic: string = 'Định lý Pytago';
  // numQuestions: number = 5;
  // passingScore: number = 4;
  public createQuestions(contentTitle: string, contentTopic: string, numQuestions: number, passingScore: number): Observable<any> {
    const url = `${this.apiUrlQuestion}?contentTitle=${encodeURIComponent(contentTitle)}&contentTopic=${encodeURIComponent(contentTopic)}&numQuestions=${numQuestions}&passingScore=${passingScore}`;
    let result = this.http.get(url);
    console.log(result);
    
    return result;
  }
  // Lấy danh sách câu hỏi từ bảng quiz_temp
  public getQuestionsList(contentId: string): Observable<any> {
    const url = `${this.apiUrlRoot}api/get-questions-list?contentId=${encodeURIComponent(contentId)}`;
    let result = this.http.get(url);
    console.log(result);
    
    return result;
  }
  // Lấy danh sách câu hỏi từ bảng quiz_temp
  public getQuizsList(): Observable<any> {
    const url = `${this.apiUrlRoot}api/get-quizs-list`;
    let result = this.http.get(url);
    console.log(result);
    
    return result;
  }

  public getQuestions(topic: string, monhoc: string): Observable<any> {
    const url = `${this.apiUrl}?topic=${encodeURIComponent(topic)}&monhoc=${encodeURIComponent(monhoc)}`;
    let result = this.http.get(url);
    console.log(result);
    
    return result;
  }

  public getQuestionsFullText(question: string): Observable<any> {
    const url = `${this.apiUrl}?question=${encodeURIComponent(question)}}`;
    let result = this.http.get(url);
    console.log(result);
    
    return result;
  }
}
