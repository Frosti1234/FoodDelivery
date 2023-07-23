import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { HomeService } from '../../api/home.service';

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() sidenav: EventEmitter<Event> = new EventEmitter();

  hide = true;
  loginForm: FormGroup;
  responseMessage: string;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      password: [null, Validators.required]
    })
  }

  handleSubmit() {
    var formDate = this.loginForm.value;
    var data = {
      email: formDate.email,
      password: formDate.password
    }

    this.homeService.login(data).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.authService.defaultRoute();
    }, (error: { error: { message: any; }; }) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  handleforgotPasswordAction(){
    this.dialog.open(ForgotPasswordDialogComponent)
  }

  toggle() {
    this.sidenav.emit();
  }
}
