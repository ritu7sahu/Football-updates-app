import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment';
@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiRequest = req.url.startsWith(environment.API_URL);
    if (isApiRequest) {
      //to add api key with each request
      req = req.clone({
        setHeaders: {
          'x-rapidapi-key': environment.API_KEY,
        },
      });
    }
    return next.handle(req);
  }
}
