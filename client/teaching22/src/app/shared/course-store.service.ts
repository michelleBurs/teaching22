import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Course} from "./course";

@Injectable({
  providedIn: 'root'
})
export class CourseStoreService {
  private api = 'http://teaching22.s1910456004.student.kwmhgb.at/api'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(`${this.api}/courses`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
