import { Component, OnInit } from '@angular/core';
import Converter from 'src/utils/degrees-celsius';
import { resourceService } from '../../services/resource.service';

@Component({
  selector: 'app-widget5',
  templateUrl: './widget5.component.html',
  styleUrls: ['./widget5.component.css']
})
export class Widget5Component implements OnInit {

  countries = [];
  constructor(private resourceService: resourceService) { }

  ngOnInit() {
    this.getCountry();
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

}
