import { Component, OnInit, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Khai báo giao diện (Interface) cho Quiz Data
interface Quiz {
  id: string;
  title: string;
  topic: string;
  numQuestions: number;
  passingScore: number;
  createdAt: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  // Đảm bảo import các module cần thiết
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // --- CSS (Styles) ---
  styles: [`
    /* --- BIẾN & THIẾT LẬP CHUNG --- */
    :root {
      --color-primary: #3f51b5; /* Indigo-500 */
      --color-primary-dark: #303f9f; /* Indigo-700 */
      --color-accent: #ff4081; /* Pink-A200 */
      --color-background: #f4f5f7; /* Light Gray */
      --shadow-material: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--color-background);
      font-family: 'Roboto', Arial, sans-serif;
      color: #333;
    }

    /* --- HEADER & FOOTER --- */
    .app-header {
      background-color: var(--color-primary);
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      padding: 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      min-height: 59px; /* Đảm bảo chiều cao cố định */
    }
    .header-content {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    .app-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    .app-footer {
      padding: 12px;
      text-align: center;
      font-size: 0.75rem;
      color: #757575;
      border-top: 1px solid #e0e0e0;
      flex-shrink: 0;
    }
    
    /* --- LOADING SPINNER (Pure CSS) --- */
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .spinner {
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }


    /* --- MAIN LAYOUT (RESPONSIVE GRID) --- */
    .main-layout-wrapper {
      display: flex;
      flex-grow: 1;
      max-width: 1200px; /* Giới hạn chiều rộng tổng thể trên Desktop */
      width: 100%;
      margin: 0 auto;
    }

    /* --- SIDEBAR/NAVIGATION (Mobile/Desktop) --- */
    .sidebar-nav {
      /* Mặc định trên Mobile (ẩn) */
      position: fixed;
      top: 59px; /* Dưới Header */
      left: -250px; /* Ẩn ngoài màn hình */
      width: 250px;
      height: calc(100% - 59px);
      background-color: white;
      padding: 0;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
      transition: left 0.3s ease;
      z-index: 150;
      overflow-y: auto;
    }
    .sidebar-nav.sidebar-open {
      left: 0; /* Hiện trên Mobile khi click menu */
    }

    /* Backdrop (che màn hình khi menu mobile mở) */
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 140;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }
    .backdrop.show {
      opacity: 1;
      visibility: visible;
    }

    .menu-toggle {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-right: 16px;
        display: block; /* Mặc định hiện trên Mobile */
    }
    .menu-toggle svg {
        width: 28px;
        height: 28px;
    }

    /* Style cho các mục trong Menu */
    .nav-section-title {
        font-size: 0.8rem;
        font-weight: 500;
        color: #757575;
        padding: 8px 16px 4px;
        margin-top: 16px;
        border-bottom: 1px solid #eee;
    }
    .nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .nav-link {
        display: block;
        padding: 12px 16px;
        color: #444;
        text-decoration: none;
        transition: background-color 0.2s;
    }
    .nav-link:hover, .nav-link.active {
        background-color: #e8eaf6; /* Light Indigo */
        color: var(--color-primary);
        font-weight: 500;
        border-left: 3px solid var(--color-primary);
    }
    .nav-link.active {
        border-left: 5px solid var(--color-primary);
    }


    /* --- CONTENT AREA --- */
    .content-area {
      flex-grow: 1;
      padding: 16px; /* Padding cho Mobile */
    }
    .quiz-creator-card {
        max-width: 480px; /* Giới hạn chiều rộng form */
        width: 100%;
        margin: 0 auto; /* Căn giữa form trên Mobile */
    }

    /* --- MATERIAL CARD & TYPOGRAPHY --- */
    .material-card {
      background-color: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: var(--shadow-material);
      margin-bottom: 24px;
    }
    .card-title {
        font-size: 1.3rem;
        font-weight: 500;
        color: var(--color-primary-dark);
        margin-bottom: 24px;
        border-bottom: 2px solid #e0e0e0;
        padding-bottom: 8px;
    }

    /* --- INPUTS & BUTTONS --- */
    .input-group {
        margin-bottom: 20px;
    }
    .input-label {
        display: block;
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 4px;
        font-weight: 500;
    }
    .material-input {
      width: 100%;
      padding: 10px 0;
      border: none;
      border-bottom: 2px solid #ccc; /* Input Material Style */
      font-size: 16px;
      transition: border-bottom-color 0.3s;
    }
    .material-input:focus {
      border-bottom-color: var(--color-primary);
      outline: none;
    }
    .small-input {
        width: 60px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
    }

    .setting-grid {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin: 24px 0;
        padding: 12px;
        border: 1px dashed #ccc;
        border-radius: 4px;
    }
    .setting-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .setting-label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #444;
    }

    .material-button {
      width: 100%;
      padding: 14px 24px;
      border-radius: 4px;
      font-weight: 500;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease-in-out;
      border: none;
      cursor: pointer;
      margin-top: 16px;
      background-color: var(--color-primary);
    }
    .material-button:hover {
        background-color: var(--color-primary-dark);
    }
    .material-button:disabled {
        background-color: #bdbdbd; 
        cursor: not-allowed;
        box-shadow: none;
    }

    .message-box {
        margin-top: 20px;
        padding: 15px;
        border-radius: 4px;
        font-size: 0.9rem;
        border-left: 5px solid;
    }
    .message-box.success {
        background-color: #e8f5e9;
        border-color: #4caf50;
        color: #1b5e20;
    }
    .message-box.error {
        background-color: #ffebee;
        border-color: #f44336;
        color: #b71c1c;
    }
    .message-box.info {
        background-color: #e3f2fd;
        border-color: #2196f3;
        color: #0d47a1;
    }
    .message-box p {
        margin: 0;
    }
    .result-url-box {
        background-color: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin-top: 15px;
    }
    .result-url-box input {
        flex-grow: 1;
        border: none;
        background: transparent;
        font-family: monospace;
        font-size: 0.9rem;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .copy-button {
        background: none;
        border: none;
        color: var(--color-primary);
        cursor: pointer;
        padding: 4px;
        transition: color 0.2s;
    }
    .copy-button:hover {
        color: var(--color-primary-dark);
    }

    /* --- MEDIA QUERIES (BREAKPOINT cho Desktop/Tablet) --- */
    @media (min-width: 768px) {
      /* Tắt nút Menu Hamburger */
      .menu-toggle {
        display: none;
      }
      .header-content {
          padding-left: 0;
      }
      
      /* Bố cục 2 Cột */
      .main-layout-wrapper {
        padding-top: 24px; /* Giảm khoảng cách từ header */
      }

      /* Sidebar cố định */
      .sidebar-nav {
        position: sticky;
        top: 59px; /* Dưới header */
        left: 0;
        flex-shrink: 0;
        width: 250px;
        box-shadow: none; /* Bỏ shadow trên Desktop */
        border-right: 1px solid #e0e0e0;
        padding: 0 0 24px 0;
        z-index: 10;
        /* Đảm bảo nó luôn hiển thị trên desktop */
        left: 0 !important; 
        height: auto;
      }
      
      /* Bỏ Backdrop */
      .backdrop {
          display: none;
      }

      /* Nội dung chính */
      .content-area {
        padding: 24px 32px; /* Tăng padding trên Desktop */
      }
      .quiz-creator-card {
        margin: 0; /* Bỏ căn giữa khi có Sidebar */
      }
    }
  `],
  // --- HTML (Template) ---
  template: `
    <header class="app-header">
      <div class="header-content">
        <button class="menu-toggle" (click)="isMenuOpen.set(!isMenuOpen())">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        <h1 class="app-title">Trang Chủ Quiz Creator</h1>
      </div>
    </header>

    <div class="main-layout-wrapper">
      
      <aside class="sidebar-nav" [class.sidebar-open]="isMenuOpen()">
        <div class="nav-section-title">MENU CHUNG</div>
        <ul class="nav-list">
          <li><a [routerLink]="['/', 'user-manual']" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Hướng dẫn sử dụng</a></li>
        </ul>

        <div class="nav-section-title">GIÁO VIÊN</div>
        <ul class="nav-list">
          <li><a [routerLink]="['/', 'exercises-manage']" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Quản lý bài tập</a></li>
          <li><a [routerLink]="['/', 'pupil-manage']" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Quản lý học sinh</a></li>
          <li><a [routerLink]="['/', 'quiz-report-manage']" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Báo cáo</a></li>
        </ul>
        
        <div class="nav-section-title">HỌC SINH</div>
        <ul class="nav-list">
          <li><a [routerLink]="['/', 'quiz-manage']" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Bảng điều khiển</a></li>
          <li><a [routerLink]="['/', 'quiz']" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Trang làm bài tập</a></li>
          <li><a [routerLink]="['/', 'qr-scan-result']" [queryParams]="{ contentId: '123abc' }" routerLinkActive="active" class="nav-link" (click)="isMenuOpen.set(false)">Quét QR thử TEST</a></li>
        </ul>
      </aside>

      <main class="content-area">
        
        <div class="material-card quiz-creator-card">
          <h2 class="card-title">TẠO BỘ CÂU HỎI MỚI</h2>
          
          <div class="input-group">
            <label class="input-label" for="quizTitle">Tiêu đề Quiz (Tùy chọn)</label>
            <input id="quizTitle" type="text" [(ngModel)]="quizTitle" placeholder="Toán 7 - Định lý Pytago" class="material-input"/>
          </div>

          <div class="input-group">
            <label class="input-label" for="topicContent">Chủ đề Nội dung</label>
            <input id="topicContent" type="text" [(ngModel)]="topicContent" placeholder="Tính chất tam giác cân" class="material-input"/>
            <p *ngIf="!topicContent" style="color: var(--color-primary-dark); font-size: 0.8rem; margin-top: 5px; font-weight: 500;">*Chủ đề không được để trống.</p>
          </div>
          
          <div class="setting-grid">
            <div class="setting-item">
              <label class="setting-label">Số lượng Câu hỏi:</label>
              <input type="number" [(ngModel)]="numQuestions" min="1" max="10" class="small-input" />
            </div>
            <div class="setting-item">
              <label class="setting-label">Số câu đúng để Đạt:</label>
              <input type="number" [(ngModel)]="passingScore" min="1" [max]="numQuestions" class="small-input" />
            </div>
          </div>
          <p *ngIf="passingScore > numQuestions" style="color: var(--color-primary-dark); font-size: 0.8rem; font-weight: 500;">
              Số câu Đạt không thể lớn hơn Tổng số câu hỏi.
          </p>
          
          <button (click)="generateQuiz()" [disabled]="isLoading() || !topicContent || passingScore > numQuestions" class="material-button">
            <span *ngIf="!isLoading()">TẠO BỘ CÂU HỎI NGAY</span>
            <span *ngIf="isLoading()" style="display: flex; align-items: center; justify-content: center;">
                <div class="spinner"></div>
                <span>Đang tạo...</span>
            </span>
          </button>

          <div *ngIf="quizUrl()" class="material-card" style="margin-top: 24px;">
            <h3 class="card-title" style="font-size: 1.1rem; border-bottom: none;">Liên kết Quiz đã tạo</h3>
            <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">Chia sẻ liên kết này cho học sinh:</p>
            
            <div class="result-url-box">
                <input type="text" [value]="quizUrl()" readonly #quizLinkInput />
                <button (click)="copyUrl(quizLinkInput)" class="copy-button" title="Sao chép liên kết">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <p style="font-size: 0.9rem; font-weight: 500; color: #444;">Mã QR</p>
                <div style="display: inline-block; padding: 10px; border: 1px solid #ccc; background: #fff;">
                  <span style="display: block; width: 128px; height: 128px; line-height: 128px; font-size: 0.8rem; color: #888;">[Mã QR sẽ hiển thị ở đây]</span>
                </div>
            </div>
          </div>
        </div>

        <div *ngIf="message()" 
             class="message-box" 
             [class.success]="messageType() === 'success'" 
             [class.error]="messageType() === 'error'"
             [class.info]="messageType() === 'info'">
          <p><strong>{{ messageType() === 'success' ? 'Thành công' : messageType() === 'error' ? 'Lỗi' : 'Thông báo' }}:</strong> {{ message() }}</p>
        </div>
        
        <router-outlet></router-outlet>
        
      </main>
    </div>

    <footer class="app-footer">
      © 2025 Ứng dụng Quiz Creator. Vui lòng không sử dụng sign.
    </footer>

    <div class="backdrop" [class.show]="isMenuOpen()" (click)="isMenuOpen.set(false)"></div>
  `
})
// --- TypeScript (Logic) ---
export class Home1 implements OnInit {
  // --- Form State ---
  quizTitle: string = '';
  topicContent: string = 'Định lý Pytago Lớp 7';
  numQuestions: number = 5;
  passingScore: number = 3;

  // --- UI/Loading State (Signals) ---
  isLoading = signal(false);
  isMenuOpen = signal(false);
  quizUrl = signal<string | null>(null);
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error' | 'info'>('info');

  constructor() {
    // Set up effect để tự động ẩn thông báo sau 5 giây
    effect(() => {
        if (this.message()) {
            setTimeout(() => this.message.set(null), 5000);
        }
    });
  }

  ngOnInit(): void {
    // Không cần logic khởi tạo Auth/Firebase
    this.message.set("Chào mừng! Ứng dụng sẵn sàng tạo Quiz.");
    this.messageType.set('info');
  }
  
  /**
   * Tạo một ID duy nhất dựa trên timestamp và chuỗi ngẫu nhiên.
   * @returns {string} ID duy nhất (sử dụng làm contentId cho Quiz).
   */
  private generateUniqueId(): string {
    const timestamp = Date.now().toString(16);
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomString}`;
  }

  /**
   * Giả lập quá trình tạo Quiz và trả về URL.
   */
  async generateQuiz(): Promise<void> {
    if (!this.topicContent || this.passingScore > this.numQuestions) {
      this.message.set("Vui lòng nhập Chủ đề và kiểm tra cài đặt điểm Đạt.");
      this.messageType.set('error');
      return;
    }

    this.isLoading.set(true);
    this.message.set(null);
    this.quizUrl.set(null);

    const quizId = this.generateUniqueId();
    
    // Giả lập độ trễ khi gọi API (2 giây)
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    try {
      
      // Giả lập lưu dữ liệu và nhận URL
      const generatedUrl = `${window.location.origin}/quiz-start?contentId=${quizId}`;
      
      this.quizUrl.set(generatedUrl);
      this.message.set(`Đã tạo thành công Quiz về chủ đề "${this.topicContent}".`);
      this.messageType.set('success');

    } catch (error) {
      console.error("Lỗi trong quá trình tạo Quiz:", error);
      this.message.set('Đã xảy ra lỗi giả lập. Vui lòng thử lại.');
      this.messageType.set('error');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  /**
   * Sao chép URL vào clipboard.
   * @param inputElement Tham chiếu đến input element chứa URL.
   */
  copyUrl(inputElement: HTMLInputElement): void {
    if (inputElement.value) {
      inputElement.select();
      document.execCommand('copy');
      this.message.set('Đã sao chép liên kết vào clipboard!');
      this.messageType.set('info');
    }
  }
}