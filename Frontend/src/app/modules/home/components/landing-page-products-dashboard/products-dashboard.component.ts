import { Component } from '@angular/core';
import { PRODUCTS_DASHBOARD_CARDS } from '../../constants/products-dashboard-cards.const';

@Component({
  selector: 'home-landing-page-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent {
  cards = PRODUCTS_DASHBOARD_CARDS;
}
