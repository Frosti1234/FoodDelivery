import { Component } from '@angular/core';
import { PRODUCTS_CAROUSEL_SLIDES } from '../../constants/products-carousel-slides.const';


@Component({
  selector: 'home-landing-page-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent {
  slides = PRODUCTS_CAROUSEL_SLIDES;
 }
