import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './components/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ConfirmationDialogModule { }
