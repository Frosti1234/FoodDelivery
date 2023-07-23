import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Api } from 'src/app/core/enums/api.enum';
import { Observable } from 'rxjs';
import { DashboardStatistics } from '../interfaces/dashboard-statistics.interface';


@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) { }

  getDetails(): Observable<DashboardStatistics> {
    return this.httpClient.get<DashboardStatistics>(environment.apiUrl + Api.STATISTICS_DETAILS);
  }
}
