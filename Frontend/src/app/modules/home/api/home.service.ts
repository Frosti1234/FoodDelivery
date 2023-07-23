import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/core/enums/api.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  signup(data) {
    return this.httpClient.post(environment.apiUrl + Api.USER_SIGNUP, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data) {
    return this.httpClient.post(environment.apiUrl + Api.USER_LOGIN, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  forgotPassword(data) {
    return this.httpClient.post(environment.apiUrl + Api.USER_FORGOT_PASSWORD, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  changePassword(data) {
    return this.httpClient.post(environment.apiUrl + Api.USER_CHANGE_PASSWORD, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
