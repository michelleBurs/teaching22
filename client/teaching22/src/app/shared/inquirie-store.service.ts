import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Inquirie} from "./inquirie";

@Injectable({
  providedIn: 'root'
})
export class InquirieStoreService {
  private api = 'http://teaching22.s1910456004.student.kwmhgb.at/api'

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Array<Inquirie>> {
    return this.http.get<Array<Inquirie>>(`${this.api}/inquiries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(inquirie: Inquirie): Observable<any> {
    return this.http.post(`${this.api}/inquiries`, inquirie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(inquirie: Inquirie): Observable<any> {
    return this.http.put(`${this.api}/inquiries/${inquirie.id}`, inquirie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
