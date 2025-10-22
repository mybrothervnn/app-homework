import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatAnchor } from "@angular/material/button";


// Load thư viện qrcode.js
declare const QRCode: any

@Component({
  selector: 'app-create-question',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    QRCodeComponent,
    MatAnchor
  ],
  templateUrl: './create-question.html',
  styleUrl: './create-question.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQuestion {
  contentTitle: string = 'Tin học lớp 10 - tuần 4';
  contentTopic: string = 'Hệ nhị phân và dữ liệu số nguyên.';
  numQuestions: number = 20;
  passingScore: number = 14;
  isLoading: boolean = false;
  hasResult: boolean = false;
  urlResult: string = '';

  quizUrl: string | null = null;
  message: string | null = null;
  messageType: 'success' | 'error' | 'info' = 'info';

  private readonly apiKey = "";
  private readonly apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${this.apiKey}`;
  private readonly baseUrl = window.location.origin;

  constructor(private questionService: QuestionService, private cdr: ChangeDetectorRef) { }

  async generateQuiz() {
    if (this.isLoading || !this.contentTopic) {
      this.setMessage('Vui lòng nhập Chủ đề/Nội dung để tạo câu hỏi.', 'error');
      return;
    }
    if (this.passingScore > this.numQuestions) {
      this.setMessage('Số câu đúng để Đạt không thể lớn hơn Tổng số câu hỏi.', 'error');
      return;
    }

    this.isLoading = true;
    this.message = null;
    this.quizUrl = null;

    this.questionService.createQuestions(this.contentTitle, this.contentTopic, this.numQuestions, this.passingScore).subscribe({
      next: (data) => {
        console.log("Data nhận được: ", data);
        this.isLoading = false;
        this.hasResult = true;
        // this.urlResult = 'http://localhost:4200/qr-scan-result?contentId=' + data.contentId;
        this.urlResult = 'https://homework.vnapp.online/qr-scan-result?contentId=' + data.contentId;
        this.renderQRCode();
        this.message = data;
        // this.quizUrl = 'http://localhost:4200/quiz-nhan'; //`${this.baseUrl}/quiz-nhan`;
        this.cdr.detectChanges();
        //contentId: "199eba8bd0c-wc2izkm9"
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });

  }
  renderQRCode() {
    const qrcodeElement = document.getElementById("qrcode");
    if (qrcodeElement) {
      qrcodeElement.innerHTML = ''; // Xóa mã QR cũ

      if (typeof QRCode !== 'undefined') {
        new QRCode("qrcode", { // Khởi tạo thư viện
          text: this.urlResult,
          width: 128,
          height: 128,
          colorDark: "#333333",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    }
  }

  copyUrl() {
    if (this.urlResult) {
      const dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = this.urlResult;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.setMessage('Đã sao chép liên kết vào clipboard!', 'info');
    }
  }

  elementType: 'url' | 'img' | 'canvas' | 'svg' = 'canvas';
  saveAsImage(parent: any) {
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "angularx-qrcode"
      link.click()
    }
  }
  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }

  private setMessage(text: string, type: 'success' | 'error' | 'info') {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
    }, 5000);
  }

}
