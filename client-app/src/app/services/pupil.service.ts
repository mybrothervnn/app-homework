import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PupilDto, pupills1 } from '../common/dto';

@Injectable({ providedIn: 'root' })
export class PupilService {
//   private apiUrl = 'https://homework.vnapp.online/api/generate-questions';
  private apiUrl = 'http://localhost:3000/api/generate-questions';


  constructor(private http: HttpClient) {}

  public getPupils(classId: string): PupilDto[] {
    return pupills1;
  }
}
