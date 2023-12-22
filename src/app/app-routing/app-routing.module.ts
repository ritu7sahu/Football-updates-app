import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FixturesComponent } from '../pages/fixtures/fixtures.component';
import { StandingsComponent } from '../pages/standings/standings.component';

const routes: Routes = [
  { path: 'fixtures/:id', component: FixturesComponent },
  { path: '', component: StandingsComponent },
  { path: 'standings/:name', component: StandingsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
