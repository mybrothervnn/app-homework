import { Component } from '@angular/core';
import { PupilService } from '../../../services/pupil.service';
import { PupilDto } from '../../../common/dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-pupil-manage',
  imports: [CommonModule, FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,

  ],
  templateUrl: './pupil-manage.html',
  styleUrl: './pupil-manage.css'
})
export class Pupilmanage {
  // ds học sinh
  pupils: PupilDto[] = [];

  constructor(private pupilService: PupilService) {
    this.pupils = this.pupilService.getPupils('10');
  }

  currentPupil: PupilDto = { id: 1, name: '', age: 15, classId: 1, grade: '5th', levelSkill: 'Intermediate' };
  editMode = false;
  editIndex: number = -1;

  onSubmit() {
    if (this.editMode) {
      this.pupils[this.editIndex] = { ...this.currentPupil };
      this.cancelEdit();
    } else {
      this.pupils.push({ ...this.currentPupil });
      this.currentPupil = { id: 1, name: '', age: 15, classId: 1, grade: '5th', levelSkill: 'Intermediate' };
    }
  }

  editPupil(index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.currentPupil = { ...this.pupils[index] };
  }

  deletePupil(index: number) {
    this.pupils.splice(index, 1);
    if (this.editMode && this.editIndex === index) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editIndex = -1;
    this.currentPupil = { id: 1, name: '', age: 15, classId: 1, grade: '5th', levelSkill: 'Intermediate' };
  }
}
