
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Roles } from 'src/app/core/enums/roles.enum';
import { RouteGuard } from 'src/app/core/guards/route-guard.guard';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [RouteGuard],
    data: {
      expectedRole: [Roles.USER]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }
