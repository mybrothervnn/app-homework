import { Routes } from '@angular/router';

import { QuizComponent } from './pages/pupil-page/quiz/quiz';
import { App } from './app';
import { QuizThanh1 } from './pages/pupil-page/quiz-thanh-1/quiz-thanh-1';
import { CreateQuestion } from './pages/create-question/create-question';
import { Home1 } from './pages/home1/home1';
import { Home2 } from './pages/home2/home2';
import { Home3 } from './pages/home3/home3';
import { QuizNhan } from './pages/pupil-page/quiz-nhan/quiz-nhan';
import { UserManual } from './pages/user-manual/user-manual';
import { E } from '@angular/cdk/keycodes';
import { Exercisesmanage } from './pages/teacher-page/exercises-manage/exercises-manage';
import { Pupilmanage } from './pages/teacher-page/pupil-manage/pupil-manage';
import { QuizReportmanageComponent } from './pages/teacher-page/quiz-report-manage/quiz-report-manage';
import { QuizManage } from './pages/pupil-page/quiz-manage/quiz-manage';

export const routes: Routes = [
	//Menu
	{
		path: 'create-question',
		component: CreateQuestion
	},
	{
		path: 'home1',
		component: Home1
	},
	{
		path: 'home2',
		component: Home2
	},
	{
		path: 'home3',
		component: Home3
	},
	// ALL Users
	{ path: 'qr-scan-result', loadComponent: () => import('./pages/qr-scan-result/qr-scan-result').then(m => m.QrScanResult) },
	//Teacher
	{
		path: 'exercises-manage',
		component: Exercisesmanage
	},
	{
		path: 'pupil-manage',
		component: Pupilmanage
	},
	{
		path: 'quiz-report-manage',
		component: QuizReportmanageComponent
	},

	//Pupil
	{
		path: 'quiz-manage',
		component: QuizManage
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


	{ path: '', redirectTo: '/home3', pathMatch: 'full' },
	{ path: '**', redirectTo: '/home3' },
];
