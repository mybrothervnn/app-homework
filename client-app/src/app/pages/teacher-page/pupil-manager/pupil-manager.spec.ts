import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilManager } from './pupil-manager';

describe('PupilManager', () => {
  let component: PupilManager;
  let fixture: ComponentFixture<PupilManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PupilManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
