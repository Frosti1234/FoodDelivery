import { Component } from '@angular/core';
import { IMAGE_CAROUSEL_SLIDES } from '../../constants/image-carousel-slides.const';

@Component({
  selector: 'home-landing-page-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent {
  slides = IMAGE_CAROUSEL_SLIDES;
}
