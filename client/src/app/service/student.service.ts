import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import qs from 'qs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentUrl = '/studentmanage/student/';

  getStudents(
    pageIndex: number = 0,
    pageSize: number = 10,
    name: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('index', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('name', name);
    return this.http.get(`${this.studentUrl}students`, {
      params
    });
  }

  deleteStudent(
    id: string
  ): Observable<any> {
    const params = new HttpParams().append('id', `${id}`);
    return this.http.get(`${this.studentUrl}deleteStudent`, {params});
  }

  editStudent(
    id: string,
    sno: string,
    name: string,
    gender: number,
    age: number,
    classId: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('sno', sno);
    formData.append('name', name);
    formData.append('gender', gender.toString());
    formData.append('age', age.toString());
    formData.append('classId', classId.toString());
    return this.http.post(`${this.studentUrl}editStudent`, formData, {});
  }

  addStudent(
    sno: string,
    name: string,
    gender: number,
    age: number,
    classId: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('sno', sno);
    formData.append('name', name);
    formData.append('gender', gender.toString());
    formData.append('age', age.toString());
    formData.append('classId', classId.toString());
    return this.http.post(`${this.studentUrl}addStudent`, formData ,{});
  }

  constructor(private http: HttpClient) {
  }
}
