import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { LeagueService } from '../../services/league.service';
import { environment } from '../../../environment';
import { Istandings, Standings } from '../../models/standings';
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) {}
  public countryName: string;
  userSubscription: Subscription;
  ngOnInit() {
    if (this.route.params) {
      this.userSubscription = this.route.params.subscribe((params: Params) => {
        if (params.name != null) {
          this.countryName = params.name.replace('Select', '');
          this.getLeagues(this.countryName);
        }
      });
    }
  }
  public leagueData: Standings[];
  public season: number;
  getLeagues(countryName: string): Observable<Istandings[]> {
    //to get top league of the country
    let url = environment.API_URL + 'leagues?country=' + countryName;
    this.leagueService
      .getLeagueData(url)
      .pipe(
        concatMap((league) => {
          //to get the top league id
          let id = league.response[0].league.id;
          let date = new Date();
          //get the current year
          let season = date.getFullYear();
          //added if condition because after some days there will be new year and for the new year, records can not be getting in response until it gets updated
          if (season == 2024) {
            this.season = 2023;
          } else {
            this.season = season;
          }
          //for getting the standings records of current league
          let standing_url =
            environment.API_URL +
            'standings?league=' +
            id +
            '&season=' +
            this.season;
          return this.leagueService.getStandingsData(standing_url);
        })
      )
      .subscribe(
        (data) => {
          this.leagueData = data.response[0].league.standings[0];
        },
        (error) => {
          console.log(error);
        }
      );
    return;
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
