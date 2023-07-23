import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { HomeService } from '../../api/home.service';

@Component({
  selector: 'home-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Output() sidenav: EventEmitter<Event> = new EventEmitter();

  password = true;
  confirmPassword = true;
  signupForm: FormGroup;
  responseMessage: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private homeService: HomeService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]]
    })
  }

  toggle() {
    this.sidenav.emit();
  }

  validateSubmit() {
    if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    var formDate = this.signupForm.value;
    var data = {
      name: formDate.name,
      email: formDate.email,
      contactNumber: formDate.contactNumber,
      password: formDate.password,
    }
    this.homeService.signup(data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "");
    }, (error: { error: { message: any; }; }) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}
