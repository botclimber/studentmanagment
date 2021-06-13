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
export class GradeCourseService {
  gradeCourseUrl = '/studentmanage/gradeCourse/';

  getGradeCourses(): Observable<any> {
    return this.http.get(`${this.gradeCourseUrl}gradeCourses`);
  }

  deleteGradeCourse(
    id: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('id', `${id}`)
    return this.http.get(`${this.gradeCourseUrl}deleteGradeCourse`,{params});
  }

 /* editGradeCourse(
    grade: number,
    subjectIds: any[]
  ): Observable<any> {
    const options = { grade, subjectIds };
    return this.http.post(`${this.gradeCourseUrl}editGradeCourse`, qs.stringify(options, { indices: false }), httpOptions);
  }*/
  editGradeCourse(
	id: number,
	grades: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('id', `${id}`)
      .append('grades', `${grades}`)
    return this.http.get(`${this.gradeCourseUrl}editGradeCourse`, {params});
  }
  constructor(private http: HttpClient) {}
}
