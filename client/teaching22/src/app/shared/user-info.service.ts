import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private api = 'http://teaching22.s1910456004.student.kwmhgb.at/api'

  constructor(private http: HttpClient) {
  }

  getCurrentUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/user`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
