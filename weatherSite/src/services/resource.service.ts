import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city';
import { Place } from 'src/app/models/place';
import { Suggested } from 'src/app/models/suggested';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class resourceService {

  constructor(public http: HttpClient) { }

  getPlace():Observable<Place>{
    return this.http.get<Place>(environment.baseUrlPlace);
  }

  getForecast():Observable<Suggested>{
    return this.http.get<Suggested>(environment.baseUrlSuggested);
  }

  getCountry():Observable<City>{
    return this.http.get<City>(environment.baseUrlCity);
  }
}
