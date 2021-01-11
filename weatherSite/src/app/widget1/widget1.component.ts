import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { resourceService } from 'src/services/resource.service';
import Converter from 'src/utils/degrees-celsius';
import ToUpperCase from 'src/utils/toUpperCase';

@Component({
  selector: 'app-widget1',
  templateUrl: './widget1.component.html',
  styleUrls: ['./widget1.component.css']
})
export class Widget1Component implements OnInit {

  places: any = [];
  place: any;
  degrees: any;
  icon: any;

  constructor(private resourceService: resourceService) { }

  ngOnInit() {
    this.getPlace();
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
