import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/core/enums/api.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(environment.apiUrl + Api.USER_GET_ALL);
  }

  update(data) {
    return this.httpClient.post(environment.apiUrl + Api.USER_UPDATE, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

}
