import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { QuestionService } from '../../services/question.service';

interface QuestionItem {
  text: string;
  options: string[];
  answer: number; // index of correct answer
}

@Component({
  selector: 'app-qr-scan-result',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, FormsModule, MatCardModule, MatProgressSpinnerModule, MatRadioModule, MatButtonModule, MatIconModule],
  templateUrl: './qr-scan-result.html',
  styleUrls: ['./qr-scan-result.css']
})
export class QrScanResult {  
  contentTitle: string = '';
  contentTopic: string = '';
  numQuestions: number = 0;
  passingScore: number = 0;
  contentId: string | null = null;
  loading = false;
  error: string | null = null;
  questions: QuestionItem[] = [];
  // user answers, store index of chosen option or null
  answers: Array<number | null> = [];
  submitted = false;
  score = 0;

  constructor(private route: ActivatedRoute, private qs: QuestionService, private cdr: ChangeDetectorRef) {
    this.route.queryParamMap.subscribe((params) => {
      this.contentId = params.get('contentId');
      if (this.contentId) {
        this.loadQuestions(this.contentId);
      } else {
        this.error = 'Không tìm thấy contentId trong URL';
      }
    });
  }

  loadQuestions(contentId: string) {
    this.loading = true;
    this.error = null;
    this.qs.getQuestionsList(contentId).subscribe({
      next: (res: any) => {
        // Normalize response which may contain `questions` as either an array,
        // a stringified JSON array, or an array with a single JSON string.
        console.log("res", res);
        this.contentTitle = res.contentTitle;
        this.contentTopic = res.contentTopic;
        this.numQuestions = res.numQuestions;
        this.passingScore = res.passingScore;
        
        let rawQuestions: any = [];
        if (!res) {
          rawQuestions = [];
        } else if (Array.isArray(res)) {
          rawQuestions = res;
        } else if (res.questions) {
          rawQuestions = res.questions;
        } else {
          rawQuestions = res;
        }

        if (typeof rawQuestions === 'string') {
          try {
            rawQuestions = JSON.parse(rawQuestions);
          } catch (e) {
            rawQuestions = [];
          }
        }

        if (Array.isArray(rawQuestions) && rawQuestions.length === 1 && typeof rawQuestions[0] === 'string') {
          const s = rawQuestions[0].trim();
          if (s.startsWith('[')) {
            try {
              rawQuestions = JSON.parse(s);
            } catch (e) {
              // leave as-is
            }
          }
        }

        if (Array.isArray(rawQuestions)) {
          rawQuestions = rawQuestions.map((q: any) => {
            if (typeof q === 'string') {
              try {
                return JSON.parse(q);
              } catch (e) {
                return { text: String(q), options: [], answer: 0 };
              }
            }
            return q;
          });
        }

        this.questions = (rawQuestions || []).map((q: any) => {
          const options: string[] = q?.options ?? q?.choices ?? [];
          let ans: any = q?.answer ?? q?.answerIndex ?? q?.correct;
          if (typeof ans === 'string') ans = parseInt(ans, 10);
          if (typeof ans !== 'number' || isNaN(ans)) ans = 0;
          // convert 1-based to 0-based if needed
          if (options && ans > options.length - 1) ans = ans - 1;
          if (ans < 0) ans = 0;
          return {
            text: q?.text ?? q?.question ?? '',
            options: options || [],
            answer: ans
          } as QuestionItem;
        });

        this.answers = new Array(this.questions.length).fill(null);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message || 'Lỗi khi lấy dữ liệu';
      }
    });
  }

  selectAnswer(index: number, optionIndex: number | null) {
    this.answers[index] = optionIndex;
  }

  submit() {
    if (this.submitted) return;
    this.submitted = true;
    let correct = 0;
    for (let i = 0; i < this.questions.length; i++) {
      const q = this.questions[i];
      if (this.answers[i] === q.answer) correct++;
    }
    this.score = correct;
  }
}

