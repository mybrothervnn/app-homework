//1.Class
export interface ClassDto {
    id: number;
    name: string;
    teacherId: string;    
    classLevel?: string;
}
export const classes: ClassDto[] = [
    { id: 1, name: '10 Toán - Tin', teacherId: 'T1', classLevel: '10' },
    { id: 2, name: '10 Văn', teacherId: 'T2', classLevel: '10' },
    { id: 3, name: '10 Lý Hóa Sinh ', teacherId: 'T3', classLevel: '10' },
    { id: 4, name: '10 Văn - Anh', teacherId: 'T4', classLevel: '10' },
];

//2.Teacher
export interface TeacherDto {
    id: string;
    name: string;
    className: string;
    subject: string;

}
export const teachers: TeacherDto[] = [
    { id: 'T1', name: 'Hồ Thị Ngọc', className: '10 Toán - Tin', subject: 'Toán' },
    { id: 'T2', name: 'Trần Thị B', className: '10 Văn', subject: 'Văn' },
    { id: 'T3', name: 'Lê Văn C', className: '10 Lý Hóa Sinh ', subject: 'Lý' },
    { id: 'T4', name: 'Phạm Thị D', className: '10 Văn - Anh', subject: 'Anh' },
];

// 3.Pupil
export interface PupilDto {
    id: number;
    name: string;
    classId?: number;
    age: number;
    grade: string;
    levelSkill: string;
}

export const pupills1: PupilDto[] = [
    { id: 1, name: 'John Doe', age: 10, grade: '5th', levelSkill: 'Intermediate' },
    { id: 2, name: 'Jane Smith', age: 9, grade: '4th', levelSkill: 'Beginner' },
    { id: 3, name: 'Sam Brown', age: 11, grade: '6th', levelSkill: 'Advanced' },
];

export const pupills2: PupilDto[] = [
    { id: 4, name: 'Alice Johnson', age: 10, grade: '5th', levelSkill: 'Intermediate' },
    { id: 5, name: 'Bob Lee', age: 9, grade: '4th', levelSkill: 'Beginner' },
    { id: 6, name: 'Charlie Kim', age: 11, grade: '6th', levelSkill: 'Advanced' },
];


// 4.Lession & Subject
export interface LessionDto {
    id: number;
    title: string;
    content: string;    
    subjectId: number;
}

export const lessions: LessionDto[] = [
    { id: 1, title: 'Introduction to Algebra', content: 'Basic concepts of algebra including variables and equations.', subjectId: 1 },
    { id: 2, title: 'The Water Cycle', content: 'Understanding the processes of evaporation, condensation, and precipitation.', subjectId: 2 },
    { id: 3, title: 'Ancient Civilizations', content: 'Exploring the cultures and histories of ancient societies.', subjectId: 3 },
];

export interface SubjectDto {
    id: number;
    name: string;    
    description: string;
    lessions?: LessionDto[];
}

export const subjects: SubjectDto[] = [
    { id: 1, name: 'Mathematics', description: 'Study of numbers, shapes, and patterns.', lessions: lessions.filter(l => l.subjectId === 1) },
    { id: 2, name: 'Science', description: 'Exploration of the natural world through observation and experiment.', lessions: lessions.filter(l => l.subjectId === 2) },
    { id: 3, name: 'History', description: 'Study of past events and societies.', lessions: lessions.filter(l => l.subjectId === 3) },
];

// 5.Quiz
export interface QuizDto {
    id: number;
    title: string;
    description: string;    
    subjectId: number;
}

export const quizs: QuizDto[] = [
    { id: 1, title: 'Algebra Basics', description: 'A quiz on basic algebra concepts.', subjectId: 1 },
    { id: 2, title: 'Science Fundamentals', description: 'A quiz covering fundamental science topics.', subjectId: 2 },
    { id: 3, title: 'World History Overview', description: 'A quiz on major events in world history.', subjectId: 3 },
];

// 6.Quiz Question
export interface QuizQuestionDto {
    id: number;
    quizId: number;
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
}

export const quizQuestions: QuizQuestionDto[] = [
    { id: 1, quizId: 1, questionText: 'What is the value of x in the equation 2x + 3 = 7?', options: ['1', '2', '3', '4'], correctAnswerIndex: 1 },
    { id: 2, quizId: 2, questionText: 'What planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], correctAnswerIndex: 1 },
    { id: 3, quizId: 3, questionText: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'], correctAnswerIndex: 2 },
];

// 7.Quiz Result
export interface QuizResultDto {
    id: number;
    pupilId: number;
    quizId: number;
    score: number;
    dateTaken: Date;
}

export const quizResults: QuizResultDto[] = [
    { id: 1, pupilId: 1, quizId: 1, score: 85, dateTaken: new Date('2023-10-01') },
    { id: 2, pupilId: 2, quizId: 2, score: 90, dateTaken: new Date('2023-10-02') },
    { id: 3, pupilId: 3, quizId: 3, score: 78, dateTaken: new Date('2023-10-03') },
];

// 8.Quiz Attempt
export interface QuizAttemptDto {
    id: number;
    pupilId: number;
    quizId: number;
    attemptDate: Date;
    completed: boolean;
}

export const quizAttempts: QuizAttemptDto[] = [
    { id: 1, pupilId: 1, quizId: 1, attemptDate: new Date('2023-10-01'), completed: true },
    { id: 2, pupilId: 2, quizId: 2, attemptDate: new Date('2023-10-02'), completed: true },
    { id: 3, pupilId: 3, quizId: 3, attemptDate: new Date('2023-10-03'), completed: false },
];

// 9.Quiz Category
export interface QuizCategoryDto {
    id: number;
    name: string;
    description: string;
}

export const quizCategories: QuizCategoryDto[] = [
    { id: 1, name: 'Mathematics', description: 'Quizzes related to mathematical concepts and problems.' },
    { id: 2, name: 'Science', description: 'Quizzes covering various scientific topics and discoveries.' },
    { id: 3, name: 'History', description: 'Quizzes focused on historical events and figures.' },
];

// 10.Quiz manage
export interface QuizmanageDto {
    id: number;
    name: string;
    managedQuizzes: number[]; // Array of Quiz IDs
}

export const quizmanages: QuizmanageDto[] = [
    { id: 1, name: 'manage A', managedQuizzes: [1, 2] },
    { id: 2, name: 'manage B', managedQuizzes: [3] },
];

// 11.Quiz Assignment
export interface QuizAssignmentDto {
    id: number;
    quizId: number;
    classId: number;
    assignedDate: Date;
    dueDate: Date;
}

export const quizAssignments: QuizAssignmentDto[] = [
    { id: 1, quizId: 1, classId: 1, assignedDate: new Date('2023-10-01'), dueDate: new Date('2023-10-07') },
    { id: 2, quizId: 2, classId: 2, assignedDate: new Date('2023-10-02'), dueDate: new Date('2023-10-08') },
    { id: 3, quizId: 3, classId: 3, assignedDate: new Date('2023-10-03'), dueDate: new Date('2023-10-09') },
];


