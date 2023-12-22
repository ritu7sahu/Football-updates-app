import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ifixtures } from '../models/fixtures';
@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  constructor(private http: HttpClient) {}
  //function to get the team details
  getFixturesData(url: string): Observable<Ifixtures> {
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        // Handle errors here
        console.error('API error:', error);
        return of(null);
      })
    );
  }
}
