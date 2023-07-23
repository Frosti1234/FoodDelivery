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
import { BillListComponent } from './components/list/list.component';
import { BillRoutingModule } from './bill.routing';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { ConfirmationDialogModule } from 'src/app/shared/confirmation-dialog/confirmation.module';
import { ListService } from './api/list.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ConfirmationDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
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
    BillRoutingModule,
    MatExpansionModule,
  ],
  providers: [
    SnackbarService,
    ListService,
  ],
  declarations: [
    BillListComponent,
  ]
})
export class BillModule { }
