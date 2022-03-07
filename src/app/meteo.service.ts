import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor(private servitio: HttpClient) { }

  antiCors: string = "https://api.codetabs.com/v1/proxy/?quest=";

  grabCity(city: string) {
    return this.servitio.get(`${this.antiCors}https://www.metaweather.com/api/location/search/?query=${city}`);
  }

  grabDay(cityId: number, y: number, m: number, d: number) {
    return this.servitio.get(`${this.antiCors}https://www.metaweather.com/api/location/${cityId}/${y}/${m}/${d}`);
  }
}
