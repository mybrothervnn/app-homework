import { Routes } from '@angular/router';

import { QuizComponent } from './pages/quiz/quiz';
import { App } from './app';
import { QuizThanh1 } from './pages/quiz-thanh-1/quiz-thanh-1';
import { Home } from './pages/home/home';
import { QuizNhan } from './pages/quiz-nhan/quiz-nhan';

export const routes: Routes = [
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
	{
		path: 'home',
		component: Home
	 },
	 
	{ path: '', redirectTo: '/quiz', pathMatch: 'full' },
  { path: '**', redirectTo: '/quiz' },
];
