import { Routes } from '@angular/router';

import { QuizComponent } from './pages/pupil-page/quiz/quiz';
import { App } from './app';
import { QuizThanh1 } from './pages/pupil-page/quiz-thanh-1/quiz-thanh-1';
import { Home } from './pages/home/home';
import { QuizNhan } from './pages/pupil-page/quiz-nhan/quiz-nhan';
import { UserManual } from './pages/user-manual/user-manual';
import { E } from '@angular/cdk/keycodes';
import { ExercisesManager } from './pages/teacher-page/exercises-manager/exercises-manager';
import { PupilManager } from './pages/teacher-page/pupil-manager/pupil-manager';

export const routes: Routes = [
	//Menu
	{
		path: 'home',
		component: Home
	 },
	 //Teacher
	 {
		path: 'exercises-manager',
		component: ExercisesManager
	 },
	 {
		path: 'pupil-manager',
		component: PupilManager
	 },


	{
		path: 'quiz',
		component: QuizComponent
	 },
     {
		path: 'quiz-nhan',
		component: QuizNhan
	 },
     {
		path: 'quiz-thanh-1',
		component: QuizThanh1
	 },	
	//UserManual
	
     {
		path: 'user-manual',
		component: UserManual
	 },	

	 
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  	{ path: '**', redirectTo: '/home' },
];
