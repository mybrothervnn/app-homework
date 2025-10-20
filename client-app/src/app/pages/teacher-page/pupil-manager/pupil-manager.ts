import { Component } from '@angular/core';
import { PupilService } from '../../../services/pupil.service';
import { PupilDto } from '../../../common/dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pupil-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './pupil-manager.html',
  styleUrl: './pupil-manager.css'
})
export class PupilManager {
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
