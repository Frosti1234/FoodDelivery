import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Api } from "src/app/core/enums/api.enum";
import { environment } from "src/environments/environment";

@Injectable()
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  generateReport(data) {
    return this.httpClient.post(environment.apiUrl + Api.ORDER_GENERATE_ORDER_BILL, data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getPdf(data): Observable<Blob> {
    return this.httpClient.post(environment.apiUrl + Api.ORDER_GET_PDF, data, { responseType: 'blob' });
  }

  getFilteredCategories() {
    return this.httpClient.get(environment.apiUrl + Api.CATEGORY_GET_FILTER);
  }

  getProductByCategory(id) {
    return this.httpClient.get(environment.apiUrl + Api.PRODUCT_GET_BY_CATEGORY + id);
  }

  getById(id) {
    return this.httpClient.get(environment.apiUrl + Api.PRODUCT_GET_BY_ID + id);
  }
}
