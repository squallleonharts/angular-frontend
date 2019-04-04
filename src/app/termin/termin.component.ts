import { Component, OnInit } from "@angular/core";
import { BrandService } from "../brand.service";

@Component({
  selector: "app-termin",
  templateUrl: "./termin.component.html",
  styleUrls: ["./termin.component.css"]
})
export class TerminComponent implements OnInit {
  constructor(private brand: BrandService) {}

  citiesApiInformation: any[] = [];
  timeApi: any[] = [];
  dayApi: any[] = [];

  cityApiInfo: any[] = [];

  relateCityApiInfo: any[] = [];
  distanceApiInfo: any[] = [];
  addressApiInfo: any[] = [];

  radioCity: any[] = [];
  radioDistance: any[] = [];
  radioAddress: any[] = [];

  ngOnInit() {
    this.getCities();
    this.getTimes();
  }

  getCities() {
    this.brand.allCity().subscribe(
      data1 => {
        this.citiesApiInformation = data1.CityCategory;
        // alert(JSON.stringify(this.citiesApiInformation));
        // console.log("Data:", this.citiesApiInformation);
      },
      err => console.log(err),
      () => console.log("complete")
    );
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    for (var i = 1; i < 8; i++) {
      var currentDate = new Date(
        new Date().getTime() + 24 * i * 60 * 60 * 1000
      );
      var dayName = days[currentDate.getDay()];
      var day = String(currentDate.getDate()).padStart(2, "0");
      var month = String(currentDate.getMonth() + 1).padStart(2, "0");
      var year = currentDate.getFullYear();
      var today = month + "/" + day;
      this.dayApi.push(dayName + ", " + today);
    }
    // console.log(this.dayApi);
  }

  getTimes() {
    this.brand.allTime().subscribe(
      data2 => {
        this.timeApi = data2.time;
        // alert(JSON.stringify(this.citiesApiInformation));
        // console.log("Data:", this.timeApi);
      },
      err => console.log(err)
    );
  }

  onChangeCityApi(cityValue) {
    this.cityApiInfo = this.citiesApiInformation[cityValue.value].City;

    this.relateCityApiInfo = this.cityApiInfo[0].RelateCity;
  }

  onChangeRadioApi(radioValue) {
    this.radioCity = this.cityApiInfo[radioValue.value].RelateCity;
    this.radioDistance = this.cityApiInfo[radioValue.value].Distance;
    this.radioAddress = this.cityApiInfo[radioValue.value].Address;

    console.log(this.radioCity);
    console.log(this.radioDistance);
    console.log(this.radioAddress);
  }
}
