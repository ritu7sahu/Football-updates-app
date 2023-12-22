import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ApiCacheInterceptor } from './interceptor/api-cache-interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { TopbarComponent } from './pages/topbar/topbar.component';
import { FixturesService } from './services/fixtures.service';
import { LeagueService } from './services/league.service';
import { AddHeaderInterceptor } from './interceptor/add-header-interceptor';
import { StandingsComponent } from './pages/standings/standings.component';
import { FixturesComponent } from './pages/fixtures/fixtures.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    TopbarComponent,
    FixturesComponent,
    StandingsComponent,
  ],
  providers: [
    LeagueService,
    FixturesService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiCacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
  ],

  exports: [TopbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
