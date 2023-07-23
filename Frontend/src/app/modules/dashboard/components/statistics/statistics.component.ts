import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/core/constants/global-constants';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { DashboardService } from '../../api/dashboard.service';
import { STATISTICS_CHART_DATA } from '../../constants/dashboard-statistics-chart-data.const';
import { statisticsChartData } from '../../interfaces/dashboard-statistics-chart-data.interface';
import { DashboardStatistics } from '../../interfaces/dashboard-statistics.interface';
import { ComponentsPaths, ModulesPaths } from 'src/app/core/enums/routes-paths.enum';

@Component({
  selector: 'dashboard-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  responseMessage: string;
  chartData: statisticsChartData[];

  constructor(
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {
    this.loadStatisticsData();
  }

  loadStatisticsData() {
    this.dashboardService.getDetails().subscribe((response: DashboardStatistics) => {
      this.chartData = STATISTICS_CHART_DATA.map((item, index) => {
        return {
          ...item,
          value: Object.values(response)[index]
        };
      });
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
    )
  }

  onChartSelect(event: statisticsChartData) {
    switch (event.name) {
      case 'No. products':
        this.router.navigate(['/'+ModulesPaths.MANAGEMENT+'/'+ComponentsPaths.PRODUCT]);
        break;
      case 'No. categories':
        this.router.navigate(['/'+ModulesPaths.MANAGEMENT+'/'+ComponentsPaths.CATEGORY]);
        break;
      case 'No. orders':
        this.router.navigate(['/'+ModulesPaths.BILL+'/'+ComponentsPaths.LIST]);
        break;
      default:
        break;
    }
  }
 }
