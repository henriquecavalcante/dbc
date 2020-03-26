import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const tokenVal = 'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZTc2ZmE2M2Y4NzY5OWI5YmQxNDk1MDIiLCJyb2xlcyI6W10sImZ1bGxuYW1lIjoicXdlIiwiZW1haWwiOiJxd2VAcXdlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjAtMDMtMjJUMDU6NDA6NTEuNDYwWiJ9.SWGG9310wwFuGOqjUP3lte1-TB5XqAhtezEkM7OGXJY';
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', tokenVal ? `Bearer ${tokenVal}` : '')
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
