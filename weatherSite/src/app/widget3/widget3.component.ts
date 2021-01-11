import { Component, OnInit } from '@angular/core';
import { resourceService } from 'src/services/resource.service';
import Converter from 'src/utils/degrees-celsius';
import ToUpperCase from 'src/utils/toUpperCase';

@Component({
  selector: 'app-widget3',
  templateUrl: './widget3.component.html',
  styleUrls: ['./widget3.component.css']
})
export class Widget3Component implements OnInit {

  place: any;
  degrees: any;
  countries = [];
  imagesCity: any = [];
  places: any = [];
  icon: any;

  constructor(private resourceService: resourceService) { }

  ngOnInit() {
    this.getPlace();
    this.getCountry();
  }
  getPlace() {
    this.resourceService.getPlace().subscribe(
      res => {
        res.places.forEach(element => {
          element.main_headquarter ? this.place = element : null;
          if (element.main_headquarter == false) {
            this.places.push(element);
            this.imagesCity.push(element);
          }
        });
      })
  }
  getCountry() {
    this.resourceService.getCountry().subscribe(
      res => {
        if (res.result && res.result.length > 0)
          res.result.forEach(element => {
            let temp = Converter.converter(element.main.temp);
            if (temp <= 30 && temp >= 24) {
              this.countries.push(element);
            }
          });
      }
    )
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
