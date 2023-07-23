import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/core/enums/roles.enum';
import { RouteGuard } from 'src/app/core/guards/route-guard.guard';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from 'src/app/core/layout/components/layout/layout.component';
import { ModulesPaths } from 'src/app/core/enums/routes-paths.enum';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ModulesPaths.MANAGEMENT,
        loadChildren: () => import('../management/management.module').then(m => m.ManagementModule),
        canActivate: [RouteGuard],
        data: {
          expectedRole: [Roles.ADMIN]
        }
      },
      {
        path: ModulesPaths.DASHBOARD,
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RouteGuard],
        data: {
          expectedRole: [Roles.ADMIN]
        }
      },
      {
        path: ModulesPaths.BILL,
        loadChildren: () => import('../bill/bill.module').then(m => m.BillModule),
        canActivate: [RouteGuard],
        data: {
          expectedRole: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: ModulesPaths.ORDER,
        loadChildren: () => import('../order/order.module').then(m => m.OrderModule),
        canActivate: [RouteGuard],
        data: {
          expectedRole: [Roles.USER]
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
