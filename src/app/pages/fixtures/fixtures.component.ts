import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { FixturesService } from '../../services/fixtures.service';
import { Ifixtures, Fixtures } from '../../models/fixtures';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fixturesService: FixturesService,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      let team = this.route.snapshot.paramMap.get('id');
      this.getFixures(team);
    }
  }
  public fixtureData: Fixtures[];
  public season: number;
  getFixures(team: string): Observable<Ifixtures[]> {
    let date = new Date();
    //to get the current year
    let season = date.getFullYear();
    //added if condition because after some days there will be new year and for the new year, records can not be getting in response until it gets updated
    if (season == 2024) {
      this.season = 2023;
    } else {
      this.season = season;
    }
    //url to call team details
    let url: string =
      environment.API_URL +
      'fixtures?season=' +
      this.season +
      '&team=' +
      team +
      '&last=10';
    this.fixturesService.getFixturesData(url).subscribe((data) => {
      this.fixtureData = data.response;
    });
    return;
  }
  back() {
    this.location.back();
  }
}
