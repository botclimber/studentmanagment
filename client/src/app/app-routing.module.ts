import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SubjectComponent} from './subject/subject.component';
import {LoginGuard} from './login.guard';
import {SubjectFormComponent} from './subject/subjectForm/subjectForm.component';
import {TeacherComponent} from './teacher/teacher.component';
import {TeacherFormComponent} from './teacher/teacherForm/teacherForm.component';
import {GradeCourseComponent} from './grade-course/grade-course.component';
import {ClassComponent} from './class/class.component';
import {ClassFormComponent} from './class/class-form/class-form.component';
import {CourseTeacherComponent} from './class/course-teacher/course-teacher.component';
import {StudentComponent} from './student/student.component';
import {StudentFormComponent} from './student/student-form/student-form.component';

const routes: Routes = [{path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: {breadcrumb: 'Página Principal'
}, children: [
  {path: 'subject', component: SubjectComponent, data: {breadcrumb: 'Gestão de Cadeiras'}},
      {path: 'subject/addSubject', component: SubjectFormComponent, data: {breadcrumb: 'Novos assuntos'}},
      {path: 'teacher', component: TeacherComponent, data: {breadcrumb: 'Gestão de Professores'}},
      {path: 'teacher/addTeacher', component: TeacherFormComponent, data: {breadcrumb: 'Adicionar professor'}},
      {path: 'teacher/editTeacher/:id', component: TeacherFormComponent, data: {breadcrumb: 'Editar Professor'}},
      {path: 'gradeCourse', component: GradeCourseComponent, data: {breadcrumb: 'Gestão de Cadeiras por Semestre'}},
      {path: 'class', component: ClassComponent, data: {breadcrumb: 'Gestão de Turmas'}},
      {path: 'class/addClass', component: ClassFormComponent, data: {breadcrumb: 'Adicionar Nova Turma'}},
      {path: 'class/courseTeacher/:id/:grade', component: CourseTeacherComponent, data: {breadcrumb: 'Turmas e professores'}},
      {path: 'student', component: StudentComponent, data: {breadcrumb: 'Gestão de Estudantes'}},
      {path: 'student/addStudent', component: StudentFormComponent, data: {breadcrumb: 'Adicionar Novos Estudantes'}},
      ], canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
