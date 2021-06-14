import { Component, OnInit } from '@angular/core';
import {SubjectService} from '../service/subject.service';
import {GradeCourseService} from '../service/grade-course.service';
import {TeacherService} from '../service/teacher.service';


@Component({
  selector: 'app-grade-course',
  templateUrl: './grade-course.component.html',
  styleUrls: ['./grade-course.component.css']
})
export class GradeCourseComponent implements OnInit {
  title = 'Notas Alunos';
  gradeCourses = [];
  subjects: any[] = [];
  pageIndex = 0;
  _grades= [];
  pageSize = 10;
  loading = true;
  editCache: { [key: string]: any } = {};
  isLoading = false;
  pageCount = 1;
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
  constructor(private gradeCourseService: GradeCourseService, private subjectService: SubjectService) {}
  ngOnInit(): void {
    this.searchData();
    this.loadMore();
  }
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.gradeCourseService.getGradeCourses()
      .subscribe(result => this.onSuccess(result));
  }
  onSuccess(result: any) {
    this.loading = false;
    console.log('result: ' + JSON.stringify(result));
    const data = result.data;
    this.gradeCourses = data.gradeCourses;
    this.updateEditCache();
  }
  startEdit(grade: number): void {
    this.editCache[grade].edit = true;
  }

  cancelEdit(grade: number): void {
    const index = this.gradeCourses.findIndex(item => item.grade === grade);
    this.editCache[grade] = {
      data: { ...this.gradeCourses[index] },
      edit: false
    };
  }

  saveEdit(grade: number): void {
    /*let seperator = ',';
    for (let i = 0; i < this.editCache[grade].data.subjects.length; i ++) {
      subjectIds[i] = this.editCache[grade].data.subjects[i].id;
      if (i === this.editCache[grade].data.subjects.length - 1) {
        seperator = '';
      }
      subjectName = subjectName + this.editCache[grade].data.subjects[i].name + seperator;
      subjectId = subjectId + this.editCache[grade].data.subjects[i].id + seperator;
    }
    if (this.editCache[grade].data.courses != null) {
      this.editCache[grade].data.courses.subjectNames = subjectName;
      this.editCache[grade].data.courses.subjectIds = subjectId;
    } else {
      const course = {
        grade,
        subjectIds: subjectId,
        subjectNames: subjectName
      };
      this.editCache[grade].data.courses = course;
    }*/
	 
	var data = '[';
	for(var i = 0; i < this._grades.length; i++){
  
  data += '{';
		data += '"grade": "'+(this._grades[i].grade).toString()+'" , "subjectName": "'+(this._grades[i].subjectName).toString()+'", "subjectId": "'+(this._grades[i].subjectId).toString()+'"}';

	if ((i+1) < this._grades.length) data += ',';
  }

	data += ']';
	console.log(data);
    this.gradeCourseService.editGradeCourse(grade, data).subscribe(result => {
      this.editCache[grade].edit = false;
    });
  }

  updateEditCache(): void {
    this.gradeCourses.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
	  console.log(item.grades.length);
	  for (var i=0; i<item.grades.length;i++)
	  {
		  this._grades[i]=item.grades[i];
	  }
	  console.log(this._grades);
    });
  }

  delete(grade: string): void {
    this.gradeCourseService.deleteGradeCourse(grade).subscribe(result => this.searchData());
  }
  loadMore(): void {
    if (this.pageIndex < this.pageCount && !this.isLoading) {
      this.isLoading = true;
      this.subjectService.getSubjects(this.pageIndex, this.pageSize, '')
        .subscribe(result => {
          const data = result.data;
          this.subjects = [...this.subjects, ...data.subjects];
          this.pageCount = data.pageCount;
          this.pageIndex = this.pageIndex + 1;
          this.isLoading = false;
        });
    }
  }
}
