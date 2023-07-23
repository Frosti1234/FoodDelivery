import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Roles } from "src/app/core/enums/roles.enum";
import { RouteGuard } from "src/app/core/guards/route-guard.guard";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ProductsComponent } from "./components/products/products.component";
import { UsersComponent } from "./components/users/users.component";

export const routes: Routes = [
  {
    path: 'category',
    component: CategoriesComponent,
    canActivate: [RouteGuard],
    data: {
      expectedRole: [Roles.ADMIN]
    }
  },
  {
    path: 'product',
    component: ProductsComponent,
    canActivate: [RouteGuard],
    data: {
      expectedRole: [Roles.ADMIN]
    }
  },
  {
    path: 'user',
    component: UsersComponent,
    canActivate: [RouteGuard],
    data: {
      expectedRole: [Roles.ADMIN]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
