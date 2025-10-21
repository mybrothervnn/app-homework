import { Component, OnInit, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Giữ HttpClientModule cho các lời gọi API thực tế sau này
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // Đảm bảo import các module cần thiết
  imports: [CommonModule, FormsModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // --- CSS (Styles) ---
  styles: [`
    /* --- BIẾN & THIẾT LẬP CHUNG (Giữ nguyên Material Design) --- */
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
      min-height: 59px;
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
      cursor: pointer; /* Click để về trang Landing */
    }
    .app-footer {
      padding: 12px;
      text-align: center;
      font-size: 0.75rem;
      color: #757575;
      border-top: 1px solid #e0e0e0;
      flex-shrink: 0;
    }
    
    /* --- LOADING SPINNER --- */
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

    /* --- MAIN LAYOUT & CONTENT AREA --- */
    .main-layout-wrapper {
      flex-grow: 1;
      width: 100%;
      margin: 0 auto;
      padding: 16px;
    }

    .content-container {
        max-width: 1000px;
        margin: 0 auto;
    }
    
    /* --- LANDING PAGE SPECIFIC STYLES --- */
    .landing-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 32px 0;
    }
    .landing-card {
        padding: 30px;
        text-align: center;
        border-left: 5px solid var(--color-primary);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .landing-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }
    .landing-card.teacher-mode {
        border-left-color: var(--color-accent);
    }

    .landing-card h2 {
        font-size: 1.6rem;
        font-weight: 600;
        margin-top: 0;
        color: var(--color-primary-dark);
    }
    .landing-card p {
        font-size: 1rem;
        color: #555;
        margin-bottom: 24px;
        min-height: 60px; /* Cố định chiều cao cho mô tả */
    }
    .landing-button {
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: 500;
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out;
        border: none;
        cursor: pointer;
        width: 100%;
        max-width: 300px; /* Giới hạn chiều rộng nút */
    }
    .landing-button.primary {
        background-color: var(--color-primary);
    }
    .landing-button.primary:hover {
        background-color: var(--color-primary-dark);
    }
    .landing-button.accent {
        background-color: var(--color-accent);
    }
    .landing-button.accent:hover {
        background-color: #c51162; /* Darker accent */
    }


    /* --- QUIZ CREATOR FORM STYLES (Dùng lại từ trước) --- */
    .quiz-creator-card {
        max-width: 480px; 
        width: 100%;
        margin: 16px auto; 
    }
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

    /* Input/Button/Message styles (dùng lại...) */
    .input-group { margin-bottom: 20px; }
    .input-label { display: block; font-size: 0.85rem; color: #666; margin-bottom: 4px; font-weight: 500;}
    .material-input { width: 100%; padding: 10px 0; border: none; border-bottom: 2px solid #ccc; font-size: 16px; transition: border-bottom-color 0.3s;}
    .material-input:focus { border-bottom-color: var(--color-primary); outline: none;}
    .small-input { width: 60px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; text-align: center;}
    .setting-grid { display: flex; justify-content: space-between; gap: 16px; margin: 24px 0; padding: 12px; border: 1px dashed #ccc; border-radius: 4px;}
    .setting-item { display: flex; flex-direction: column; align-items: center; gap: 8px;}
    .setting-label { font-size: 0.9rem; font-weight: 500; color: #444;}
    .material-button { background-color: var(--color-primary); width: 100%; padding: 14px 24px; border-radius: 4px; font-weight: 500; color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); transition: all 0.3s ease-in-out; border: none; cursor: pointer; margin-top: 16px;}
    .material-button:hover { background-color: var(--color-primary-dark);}
    .material-button:disabled { background-color: #bdbdbd; cursor: not-allowed; box-shadow: none;}
    .message-box { margin-top: 20px; padding: 15px; border-radius: 4px; font-size: 0.9rem; border-left: 5px solid;}
    .message-box.success { background-color: #e8f5e9; border-color: #4caf50; color: #1b5e20;}
    .message-box.error { background-color: #ffebee; border-color: #f44336; color: #b71c1c;}
    .message-box.info { background-color: #e3f2fd; border-color: #2196f3; color: #0d47a1;}
    .message-box p { margin: 0;}
    .result-url-box { background-color: #f5f5f5; padding: 12px; border-radius: 4px; display: flex; align-items: center; margin-top: 15px;}
    .result-url-box input { flex-grow: 1; border: none; background: transparent; font-family: monospace; font-size: 0.9rem; margin-right: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .copy-button { background: none; border: none; color: var(--color-primary); cursor: pointer; padding: 4px; transition: color 0.2s;}
    .copy-button:hover { color: var(--color-primary-dark);}
    
    /* --- MEDIA QUERIES (Desktop Layout) --- */
    @media (min-width: 768px) {
      .landing-grid {
          flex-direction: row;
      }
      .landing-card {
          flex: 1;
      }
    }
  `],
  // --- HTML (Template) ---
  template: `
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title" (click)="currentView = 'landing'">Quiz Creator</h1>
      </div>
    </header>

    <!-- Main Layout Container -->
    <div class="main-layout-wrapper">
      <div class="content-container">
        
        <!-- ============================================== -->
        <!-- 1. TRANG KHỞI ĐẦU (LANDING PAGE) -->
        <!-- ============================================== -->
        <div *ngIf="currentView === 'landing'">
            <h1 style="text-align: center; margin: 40px 0 20px; font-size: 2.2rem; font-weight: 300; color: var(--color-primary-dark);">
                Chọn Chế Độ Tạo Câu Hỏi
            </h1>

            <div class="landing-grid">
                <!-- CARD 1: CHẾ ĐỘ CÔNG KHAI (PUBLIC MODE) -->
                <div class="material-card landing-card">
                    <h2 style="color: #4caf50;">
                        Tạo Quiz Nhanh
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: inline-block; width: 30px; height: 30px; margin-left: 8px;" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5a9.5 9.5 0 1 0-8.9-6.4C3.8 15.6 4 16.4 4.5 17c.5.5 1.3.7 2.2.4L7 17.5l-2.4 2.4"/><path d="M15 15l-3.2 3.2c-1.1 1.1-2.6 1.8-4.2 1.8h0a6.5 6.5 0 1 1 6.5-6.5V11"/></svg>
                    </h2>
                    <p>Chỉ cần nhập chủ đề (ví dụ: "Sự kiện lịch sử 1945"), hệ thống sẽ tạo bộ câu hỏi ngay lập tức. Chia sẻ qua QR code đến Zalo, Messenger, v.v., **không cần đăng nhập**.</p>
                    
                    <button (click)="switchToPublicCreator()" class="landing-button primary">
                        BẮT ĐẦU TẠO QUIZ (Mọi người)
                    </button>
                </div>

                <!-- CARD 2: CHẾ ĐỘ GIÁO VIÊN (TEACHER MODE) -->
                <div class="material-card landing-card teacher-mode">
                    <h2 style="color: var(--color-accent);">
                        Quản lý Bài Tập Chuyên Nghiệp
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: inline-block; width: 30px; height: 30px; margin-left: 8px;" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5H6.5A2.5 2.5 0 0 0 4 7.5v12z"/><path d="M12 5v12"/><path d="M12 17h8"/></svg>
                    </h2>
                    <p>Tạo Quiz kèm mã lớp. Học sinh phải nhập tên, kết quả làm bài của toàn bộ lớp được **thống kê chi tiết** và giáo viên dễ dàng theo dõi, báo cáo.</p>
                    
                    <button (click)="simulateLoginNavigation()" class="landing-button accent">
                        ĐĂNG NHẬP (Chế độ Giáo viên)
                    </button>
                </div>
            </div>
        </div>


        <!-- ============================================== -->
        <!-- 2. TRANG TẠO QUIZ CÔNG KHAI (PUBLIC CREATOR) -->
        <!-- ============================================== -->
        <div *ngIf="currentView === 'create-public'">
          <button (click)="currentView = 'landing'" style="background: none; border: none; color: var(--color-primary); cursor: pointer; margin-bottom: 20px; display: flex; align-items: center; font-weight: 500;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Quay lại Trang Chủ
          </button>

          <div class="material-card quiz-creator-card">
            <h2 class="card-title">TẠO BỘ CÂU HỎI NHANH (CÔNG KHAI)</h2>
            
            <!-- Input cho Tiêu đề -->
            <div class="input-group">
              <label class="input-label" for="quizTitle">Tiêu đề Quiz (Tùy chọn)</label>
              <input id="quizTitle" type="text" [(ngModel)]="quizTitle" placeholder="Toán 7 - Định lý Pytago" class="material-input"/>
            </div>

            <!-- Input cho Chủ đề -->
            <div class="input-group">
              <label class="input-label" for="topicContent">Chủ đề Nội dung</label>
              <input id="topicContent" type="text" [(ngModel)]="topicContent" placeholder="Tính chất tam giác cân" class="material-input"/>
              <p *ngIf="!topicContent" style="color: var(--color-primary-dark); font-size: 0.8rem; margin-top: 5px; font-weight: 500;">*Chủ đề không được để trống.</p>
            </div>
            
            <!-- Cài đặt (Số lượng câu hỏi & Điểm Đạt) -->
            <div class="setting-grid">
              <!-- Số lượng câu hỏi -->
              <div class="setting-item">
                <label class="setting-label">Số lượng Câu hỏi:</label>
                <input type="number" [(ngModel)]="numQuestions" min="1" max="10" class="small-input" />
              </div>
              <!-- Điểm Đạt -->
              <div class="setting-item">
                <label class="setting-label">Số câu đúng để Đạt:</label>
                <input type="number" [(ngModel)]="passingScore" min="1" [max]="numQuestions" class="small-input" />
              </div>
            </div>
            <p *ngIf="passingScore > numQuestions" style="color: var(--color-primary-dark); font-size: 0.8rem; font-weight: 500;">
                Số câu Đạt không thể lớn hơn Tổng số câu hỏi.
            </p>
            
            <!-- Nút Tạo -->
            <button (click)="generateQuiz()" [disabled]="isLoading() || !topicContent || passingScore > numQuestions" class="material-button">
              <span *ngIf="!isLoading()">TẠO BỘ CÂU HỎI NGAY</span>
              <span *ngIf="isLoading()" style="display: flex; align-items: center; justify-content: center;">
                  <div class="spinner"></div>
                  <span>Đang tạo...</span>
              </span>
            </button>

            <!-- Result Card (Link và QR) -->
            <div *ngIf="quizUrl()" class="material-card" style="margin-top: 24px;">
              <h3 class="card-title" style="font-size: 1.1rem; border-bottom: none;">Liên kết Quiz đã tạo</h3>
              <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">Chia sẻ liên kết này:</p>
              
              <div class="result-url-box">
                  <input type="text" [value]="quizUrl()" readonly #quizLinkInput />
                  <button (click)="copyUrl(quizLinkInput)" class="copy-button" title="Sao chép liên kết">
                      <!-- Icon Copy SVG -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                  </button>
              </div>
              
              <!-- QR Code Area - Dùng placeholder -->
              <div style="text-align: center; margin-top: 20px;">
                  <p style="font-size: 0.9rem; font-weight: 500; color: #444;">Mã QR để chia sẻ Zalo/Messenger</p>
                  <div style="display: inline-block; padding: 10px; border: 1px solid #ccc; background: #fff;">
                    <span style="display: block; width: 128px; height: 128px; line-height: 128px; font-size: 0.8rem; color: #888;">[Mã QR cho {{ quizUrl() }}]</span>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Box -->
        <div *ngIf="message()" 
              class="message-box" 
              [class.success]="messageType() === 'success'" 
              [class.error]="messageType() === 'error'"
              [class.info]="messageType() === 'info'">
          <p><strong>{{ messageType() === 'success' ? 'Thành công' : messageType() === 'error' ? 'Lỗi' : 'Thông báo' }}:</strong> {{ message() }}</p>
        </div>
        
      </div>
    </div>

    <!-- Footer -->
    <footer class="app-footer">
      © 2025 Ứng dụng Quiz Creator.
    </footer>
  `
})
// --- TypeScript (Logic) ---
export class Home2 implements OnInit {
  // Trạng thái điều hướng chính
  currentView: 'landing' | 'create-public' = 'landing'; 

  // --- Form State ---
  quizTitle: string = '';
  topicContent: string = 'Định lý Pytago Lớp 7';
  numQuestions: number = 5;
  passingScore: number = 3;

  // --- UI/Loading State (Signals) ---
  isLoading = signal(false);
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
    this.message.set("Chào mừng! Chọn chế độ tạo Quiz bên dưới.");
    this.messageType.set('info');
  }
  
  /**
   * Chuyển sang chế độ tạo Quiz công khai và đặt lại trạng thái.
   */
  switchToPublicCreator(): void {
    this.currentView = 'create-public';
    this.quizUrl.set(null);
    this.message.set("Bắt đầu tạo Quiz công khai. Chỉ cần điền chủ đề và nhấn TẠO.");
    this.messageType.set('info');
  }

  /**
   * Giả lập chuyển hướng đến trang Đăng nhập (Vì không có router thực).
   */
  simulateLoginNavigation(): void {
    this.message.set("Đã chuyển hướng đến trang Đăng nhập (Simulated Route: /login).");
    this.messageType.set('info');
    // Trong ứng dụng thực, bạn sẽ dùng router: this.router.navigate(['/login']);
  }

  /**
   * Tạo một ID duy nhất.
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
      // Sử dụng một URL giả định để test chức năng copy và hiển thị QR
      const generatedUrl = `https://quiz.app/start?id=${quizId}`;
      
      this.quizUrl.set(generatedUrl);
      this.message.set(`Đã tạo thành công Quiz công khai về chủ đề "${this.topicContent}".`);
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
