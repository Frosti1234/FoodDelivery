import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { DashboardRoutingModule } from './dashboard.routing';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { DashboardService } from './api/dashboard.service';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    DashboardRoutingModule,
    NgxChartsModule,
  ],
  providers: [
    SnackbarService,
    DashboardService
  ]
})
export class DashboardModule { }
