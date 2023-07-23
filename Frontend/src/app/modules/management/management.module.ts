import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ManagementRoutingModule } from './management.routing';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsDialogComponent } from './components/products-dialog/products-dialog.component';
import { CategoriesDialogComponent } from './components/categories-dialog/categories-dialog.component';
import { ConfirmationDialogModule } from 'src/app/shared/confirmation-dialog/confirmation.module';
import { CategoryService } from './api/category.service';
import { UserService } from './api/user.service';
import { ProductService } from './api/product.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    ConfirmationDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    ManagementRoutingModule,
    MatExpansionModule,
  ],
  providers: [
    SnackbarService,
    CategoryService,
    ProductService,
    UserService
  ],
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    UsersComponent,
    CategoriesDialogComponent,
    ProductsDialogComponent,
  ]
})
export class ManagementModule { }
