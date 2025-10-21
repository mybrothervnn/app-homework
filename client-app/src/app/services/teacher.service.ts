import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherDto, teachers} from '../common/dto';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private apiUrl = 'https://homework.vnapp.online/api/generate-questions';
//  private apiUrl = 'http://localhost:3000/api/generate-questions';

  public currentTeacherName = 'Ho Thi Ngoc';
  constructor(private http: HttpClient) {}

  public getTeacherInfor(): TeacherDto {
    return teachers[0];
  }
}
