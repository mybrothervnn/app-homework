import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-manual',
  imports: [
    MatIconModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './user-manual.html',
  styleUrl: './user-manual.css'
})
export class UserManual {

}
