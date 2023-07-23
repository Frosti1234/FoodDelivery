import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { UserMenuComponent } from './components/usermenu/user-menu.component';
import { ChangePasswordComponent } from './components/usermenu-change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationDialogModule } from 'src/app/shared/confirmation-dialog/confirmation.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LayoutComponent,
    TabsComponent,
    UserMenuComponent,
    ChangePasswordComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ConfirmationDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
  ]
})
export class LayoutModule { }
