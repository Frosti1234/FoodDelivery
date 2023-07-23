import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/core/enums/api.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class ListService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get(environment.apiUrl + Api.ORDER_GET);
  }

  delete(id) {
    return this.httpClient.post(environment.apiUrl + Api.ORDER_DELETE_BY_ID + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getPdf(data): Observable<Blob> {
    return this.httpClient.post(environment.apiUrl + Api.ORDER_GET_PDF, data, { responseType: 'blob' });
  }
}
