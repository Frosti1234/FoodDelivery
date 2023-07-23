import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Roles } from 'src/app/core/enums/roles.enum';
import { RouteGuard } from 'src/app/core/guards/route-guard.guard';
import { BillListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component: BillListComponent,
    canActivate: [RouteGuard],
    data: {
      expectedRole: [Roles.ADMIN,Roles.USER]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BillRoutingModule { }
