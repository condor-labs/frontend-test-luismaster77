import { AfterViewInit, Component} from '@angular/core';
import * as moment from 'moment';
import { resourceService } from 'src/services/resource.service';
import Converter from 'src/utils/degrees-celsius';
import ToUpperCase from 'src/utils/toUpperCase';


@Component({
  selector: 'app-widget2',
  templateUrl: './widget2.component.html',
  styleUrls: ['./widget2.component.css']
})
export class Widget2Component implements AfterViewInit {

  forecast = [];
  suggested: any;
  suggestedData: any;
  degrees: any;
  slideIndex = 1;

  constructor(private resourceService: resourceService) { }

  ngOnInit() {
    this.getForecast();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showSlides(this.slideIndex);
    }, 700);
  }
  getForecast() {
    let listHumidity = [];
    this.resourceService.getForecast().subscribe(
      res => {
        res.list.forEach(element => {
          if (element) {
            listHumidity.push(element.main.humidity);
            let date: any = new Date(element.date);
            let day = moment(date).format('dddd');
            element.date = day;
            this.forecast.push(element);
            this.suggested = res;
          }
        });
        this.forecast.forEach(element => {
          let temp = Converter.converter(element.main.temp);
          let humidity = Math.min.apply(null, listHumidity);
          if (temp <= 28 && temp >= 24 && humidity == element.main.humidity) {
            this.suggestedData = element;
          }
        });
      })
  }
  converterDegreesValue(value: any) {
    return this.degrees = Converter.converter(value);
  }
  toUpperCase(value: any) {
    this.showSlides(this.slideIndex);
    return ToUpperCase.toUpperCase(value);
  }

  /*Slider*/
  plusSlides(n: any) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: any) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: any) {
    let i: any;
    let slides: any = document.getElementsByClassName("widget-carousel-item");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    let slider = this.slideIndex - 1;
    let dot = this.slideIndex - 1;
    if (slides.length > 0) {
      slides[slider].style.display = "block";
      dots[dot].className += " active";
    }
  }
}
