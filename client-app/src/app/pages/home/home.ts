import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
      RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  //Tạo ra biến title lưu giá trị app Home Work
  title = 'App Home Work';

}
