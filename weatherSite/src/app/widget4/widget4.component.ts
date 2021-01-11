import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Converter from 'src/utils/degrees-celsius';
import ToUpperCase from 'src/utils/toUpperCase';
import { resourceService } from '../../services/resource.service';

@Component({
  selector: 'app-widget4',
  templateUrl: './widget4.component.html',
  styleUrls: ['./widget4.component.css']
})
export class Widget4Component implements OnInit {

  place: any;
  imagesCity: any = [];
  places: any = [];
  suggested: any;
  suggestedData: any;
  degrees: any;
  forecast = [];
  icon: any;

  constructor(private resourceService: resourceService) { }

  ngOnInit() {
    this.getPlace();
    this.getForecast();
  }

  getPlace() {
    this.resourceService.getPlace().subscribe(
      res => {
        res.places.forEach(element => {
          element.main_headquarter ? this.place = element : null;
          if (this.place && this.place.weather.length > 0) {
            for (const iterator of this.place.weather) {
              this.icon = iterator.icon;
            }
          }
          if (element.main_headquarter == false) {
            this.places.push(element);
          }
        });
      })
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

  getIconWeather() {
    return this.place.main.icon;
  }

  toUpperCase(value: any) {
    return ToUpperCase.toUpperCase(value);
  }


}
