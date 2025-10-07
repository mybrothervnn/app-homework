import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
//   private apiUrl = 'https://homework.vnapp.online/api/generate-questions';
  private apiUrl = 'http://localhost:3000/api/generate-questions';


  constructor(private http: HttpClient) {}

  public getQuestions(topic: string, monhoc: string): Observable<any> {
    const url = `${this.apiUrl}?topic=${encodeURIComponent(topic)}&monhoc=${encodeURIComponent(monhoc)}`;
    let result = this.http.get(url);
    console.log(result);
    
    return result;
  }
}
