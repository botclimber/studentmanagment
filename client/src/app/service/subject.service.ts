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
export class SubjectService {
  subjectUrl = '/studentmanage/subject/';

  getSubjects(
    pageIndex: number = 0,
    pageSize: number = 10,
    name: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('index', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('name', name);
    return this.http.get(`${this.subjectUrl}subjects`, {
      params
    });
  }

  deleteSubject(
    id: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('id', id);
    return this.http.get(`${this.subjectUrl}deleteSubject`, {params});
  }

  editSubject(
    id: string,
    name: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('id', id)
      .append('name', name);
    return this.http.get(`${this.subjectUrl}editSubject`, { params });
  }
  addSubject(
    name: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('name', name);
    return this.http.get(`${this.subjectUrl}addSubject`, { params });
  }
  constructor(private http: HttpClient) {}
}
