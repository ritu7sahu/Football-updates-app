import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Istandings } from '../models/standings';
@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private http: HttpClient) {}
  //function to get the league data of country
  getLeagueData(url: string): Observable<Istandings> {
    return this.http.get(url).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        // Handle errors here
        console.error('API error:', error);
        return of(null);
      })
    );
  }
  //function to get the standings of the league
  getStandingsData(url: string): Observable<Istandings> {
    return this.http.get(url).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        // Handle errors here
        console.error('API error:', error);
        return of(null);
      })
    );
  }
}
