import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/landing-page-footer/footer.component';
import { ImageCarouselComponent } from './components/landing-page-image-carousel/image-carousel.component';
import { ProductsCarouselComponent } from './components/landing-page-products-carousel/products-carousel.component';
import { ProductsDashboardComponent } from './components/landing-page-products-dashboard/products-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCarouselModule } from "@ssegning-web/mat-carousel";
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from 'src/app/core/layout/layout.module';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { HomeService } from './api/home.service';

@NgModule({
  declarations: [
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    ImageCarouselComponent,
    ProductsCarouselComponent,
    ProductsDashboardComponent,
    ForgotPasswordDialogComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatCarouselModule,
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers: [
    SnackbarService,
    HomeService,
  ]
})
export class HomeModule { }
