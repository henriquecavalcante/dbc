import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  // function to set the header in every request
  private setHeaders(header: Map<string, string>): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZTc2ZmE2M2Y4NzY5OWI5YmQxNDk1MDIiLCJyb2xlcyI6W10sImZ1bGxuYW1lIjoicXdlIiwiZW1haWwiOiJxd2VAcXdlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjAtMDMtMjJUMDU6NDA6NTEuNDYwWiJ9.SWGG9310wwFuGOqjUP3lte1-TB5XqAhtezEkM7OGXJY'
    };

    if (header) {
      header.forEach((value, key) => {
        headersConfig[key] = value;
      });
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(
    path: string,
    options?: HttpParams,
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .get(`/api/${path}`, {
        headers: this.setHeaders(header),
        params: options,
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }

  put(
    path: string,
    body: object = {},
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .put(`/api/${path}`, JSON.stringify(body), {
        headers: this.setHeaders(header),
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }

  post(
    path: string,
    body: object = {},
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .post(`/api/${path}`, JSON.stringify(body), {
        headers: this.setHeaders(header),
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }

  delete(path: string, header?: Map<string, string>): Observable<any> {
    return this.http
      .delete(`/api/${path}`, {
        headers: this.setHeaders(header),
      })
      .pipe(
        catchError(this.formatErrors),
        map((res: HttpResponse<Response>) => res),
      );
  }
}
