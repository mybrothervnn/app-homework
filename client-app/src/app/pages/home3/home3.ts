import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

// Giao diện dữ liệu mẫu cho Menu và Card
interface MenuItem {
  name: string;
  icon: string;
  link: string;
}

interface ContentCard {
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  // Đảm bảo import các module cần thiết
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // --- CSS (Styles) ---
  styleUrl: './home3.css',
  // --- HTML (Template) ---
  templateUrl: './home3.html'
})
// --- TypeScript (Logic) ---
export class Home3 implements OnInit {

  // --- Data Dữ liệu mẫu ---
  menuItems: MenuItem[] = [
    { name: 'Tạo Nhanh', icon: 'qr_code_2_add', link:'qr-scan-result' }, 
    { name: 'Lớp Học', icon: 'school', link:'pupil-manage' }, 
    { name: 'Thống Kê', icon: 'grouped_bar_chart' , link:'quiz-report-manage' }, 
    { name: 'Hồ Sơ', icon: '3p', link:'user-manual' }, 
    { name: 'Hướng Dẫn', icon: 'assistant_direction', link:'user-manual' } 
  ];

  contentCards: ContentCard[] = [
    { 
      title: 'Tạo Quiz miễn phí', 
      subtitle: 'Chế độ tạo câu hỏi cho mọi người.', 
      description: 'Chỉ cần nhập chủ đề và tạo câu hỏi, bạn sẽ nhận ngay QR code để chia sẻ qua Zalo, Messenger mà không cần đăng nhập.', 
      color: '#4CAF50' 
    },
    { 
      title: 'Quản Lý Lớp Học', 
      subtitle: 'Dành riêng cho Giáo viên.', 
      description: 'Yêu cầu đăng nhập. Tạo bài tập hằng ngày cho các lớp,yêu cầu học sinh làm bài tập và thống kê kết quả làm bài chi tiết của từng học sinh.', 
      color: '#2196F3' 
    },
    { 
      title: 'Kho Bài Tập', 
      subtitle: 'Tìm kiếm và sử dụng lại.', 
      description: 'Truy cập thư viện các bài tập đã tạo và chia sẻ từ cộng đồng để sử dụng ngay lập tức.', 
      color: '#FF9800' 
    },
    { 
      title: 'Báo Cáo Chi Tiết', 
      subtitle: 'Phân tích kết quả học tập.', 
      description: 'Xem báo cáo về điểm số, thời gian làm bài, và các câu hỏi học sinh thường sai để đưa ra đánh giá chính xác.', 
      color: '#9C27B0' 
    }
  ];

  // --- UI State (Signals) ---
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error' | 'info'>('info');

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.message.set("");
    this.messageType.set('info');
  }
  
  /**
   * Giả lập chức năng Đăng nhập.
   */
  simulateLogin(): void {
    this.message.set("Chuyển hướng đến trang Đăng nhập...");
  }
  
  /**
   * Giả lập chức năng Điều hướng Menu.
   * @param target Tên chức năng được click
   */
  simulateNavigation(target: string): void {
    // điều hướng đến trang tương ứng
    //TODO
    this.router.navigate([target]);
    this.message.set(`Chuyển hướng đến chức năng: ${target}...`);
  }
}
