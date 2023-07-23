import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/core/enums/api.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  add(data) {
    return this.httpClient.post(environment.apiUrl + Api.PRODUCT_ADD, data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  update(data) {
    return this.httpClient.post(environment.apiUrl + Api.PRODUCT_UPDATE, data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getProducts() {
    return this.httpClient.get(environment.apiUrl + Api.PRODUCT_GET);
  }

  updateStatus(data) {
    return this.httpClient.post(environment.apiUrl + Api.PRODUCT_UPDATE_STATUS, data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  delete(id) {
    return this.httpClient.post(environment.apiUrl + Api.PRODUCT_DELETE + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}
