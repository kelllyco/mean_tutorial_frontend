import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { map } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getPublished(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/published`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
  
  findByAuthorId(authorId: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?authorId=${authorId}`);
  }

  findPublishedByTitle(title: any): Observable<Tutorial[]> {
    return this.findByTitle(title)
      .pipe(map(tutorials => tutorials.filter(tutorial => tutorial.published === true)));
  }
}
