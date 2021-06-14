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
export class HomeService {
  classUrl = '/studentmanage/uploadFile';

  uploadFile(
    file
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post(this.classUrl, formData);
  }

  
  constructor(private http: HttpClient) {}
}
