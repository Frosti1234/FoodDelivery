import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { Roles } from 'src/app/core/enums/roles.enum';
import { RouteGuard } from 'src/app/core/guards/route-guard.guard';


const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [RouteGuard],
    data: {
      expectedRole: [Roles.ADMIN]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
