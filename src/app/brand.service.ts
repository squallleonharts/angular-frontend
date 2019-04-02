import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BrandService {
  url: string = "./assets/data.json";
  city_list_url: string = "./assets/city-list.json";
  time_url: string = "./assets/time.json";
  kilometre_url: string = "./assets/kilometre.json";

  constructor(private http: HttpClient) {}

  allBrand(): Observable<any> {
    return this.http.get(this.url);
  }

  allCity(): Observable<any> {
    return this.http.get(this.city_list_url);
  }

  allTime(): Observable<any> {
    return this.http.get(this.time_url);
  }

  allKilometre(): Observable<any> {
    return this.http.get(this.kilometre_url);
  }
}
