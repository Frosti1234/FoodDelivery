import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { HomeService } from 'src/app/modules/home/api/home.service';

@Component({
  selector: 'usermenu-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword = true;
  newPassword = true;
  confirmPassword = true;
  changePasswordForm: FormGroup;
  responseMessage: string;

  constructor(
    private router: Router,
    private formBulider: FormBuilder,
    private homeService: HomeService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBulider.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    })
  }

  validateSubmit() {
    if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  handlePasswordChangeSubmit() {
    var formDate = this.changePasswordForm.value;
    var data = {
      oldPassword: formDate.oldPassword,
      newPassword: formDate.newPassword,
      confirmPassword: formDate.confirmPassword
    }
    this.homeService.changePassword(data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    }
    );
  }
}
