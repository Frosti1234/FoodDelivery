import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Api } from 'src/app/core/enums/api.enum';

@Injectable()
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  add(data){
    return this.httpClient.post(environment.apiUrl + Api.CATEGORY_ADD, data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  update(data) {
    return this.httpClient.post(environment.apiUrl + Api.CATEGORY_UPDATE, data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getCategories() {
    return this.httpClient.get(environment.apiUrl + Api.CATEGORY_GET);
  }
}
