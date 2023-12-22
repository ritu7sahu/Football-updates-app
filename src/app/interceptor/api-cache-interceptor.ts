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
export class ApiCacheInterceptor implements HttpInterceptor {
  //cache to store response data
  public cache = new Map<string, HttpResponse<any>>();
  //endpoints of cache
  private endPoints = new Set([]);
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const url = req.url.replace(environment.API_URL, '');

    if (this.endPoints.has(url)) {
      //try to get the cache response
      const cacheResponse = this.cache.get(req.url);
      if (cacheResponse) {
        //if the response is found return the observable of http response
        return of(cacheResponse);
      }
      //if response is not found then send the request and cache the response
      return next.handle(req).pipe(
        tap((response) => {
          if (response instanceof HttpResponse) {
            this.cache.set(req.url, response);
          }
        })
      );
      //console.log(this.cache, 'get cached response');
    }

    this.endPoints.add(url);
    //if request endpoint is not in the set of cache then send the reqest as it is
    return next.handle(req);
    //const cachedResponse = this.cache.get(req)
  }
}
