import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { HomeService } from '../../api/home.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss'],
})
export class ForgotPasswordDialogComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  responseMessage:any;

  registerSucess:boolean = false;
  isButtonVisible = true;

  constructor(
    private formBulider:FormBuilder,
    private homeService:HomeService ,
    public dialogRef:MatDialogRef<ForgotPasswordDialogComponent> ,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBulider.group({
      email:[null,[Validators.required , Validators.pattern(GlobalConstants.emailRegex)]]
    });

  }

  handleSubmit(){
    var formData = this.forgotPasswordForm.value;
    var data = {
      email:formData.email
    }

    this.homeService.forgotPassword(data).subscribe((response:any)=>{

      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error) =>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
        this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
      }else{
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
      }
    });
  }

}
