import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import axios from "axios";

import { BrandService } from "./brand.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loginForm: FormGroup;

  title = "app";
  tab = 1;
  step = 1;

  tmp1 = true;
  tmp2 = true;
  tmp3 = true;

  // when tab == 1
  brandapiInformation: any[] = [];
  kilometreApi: any[] = [];
  modelapiInfo: any[] = [];
  yearapiInfo: any[] = [];
  designapiInfo: any[] = [];
  themodelapiInfo: any[] = [];
  typeapiInfo: any[] = [];

  selectedBrand: any[] = [];
  selectedModel: any[] = [];
  selectedYear: any[] = [];
  selectedDesign: any[] = [];
  selectedTheModel: any[] = [];
  selectedType: any[] = [];

  // when tab == 2
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
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      phone: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      times: ["", [Validators.required]],
      dates: ["", [Validators.required]]
    });
    // when tab == 1
    this.getCountries();
    this.getKilometre();

    // when tab == 2
    this.getCities();
    this.getTimes();
  }

  constructor(private brand: BrandService, private formBuilder: FormBuilder) {}

  // when tab == 1
  getCountries() {
    this.brand.allBrand().subscribe(
      data2 => {
        this.brandapiInformation = data2.Brand;
        //alert(JSON.stringify(this.brandapiInformation));
        //console.log('Data:', this.brandapiInformation);
      },
      err => console.log(err),
      () => console.log("complete")
    );
  }

  getKilometre() {
    this.brand.allKilometre().subscribe(
      data3 => {
        this.kilometreApi = data3.kilometre;
      },
      err => console.log(err)
    );
  }

  // when tab == 2
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

  // when tab == 1
  onChangeBrandApi(brandValue) {
    this.selectedBrand = this.brandapiInformation[brandValue].BrandName;

    this.modelapiInfo = this.brandapiInformation[brandValue].Model;
    this.yearapiInfo = this.modelapiInfo[0].Year;
    this.designapiInfo = this.yearapiInfo[0].Design;
    this.themodelapiInfo = this.designapiInfo[0].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedModel = this.modelapiInfo[0].ModelName;
    this.selectedYear = this.yearapiInfo[0].YearName;
    this.selectedDesign = this.designapiInfo[0].DesignName;
    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];

    this.tmp1 = false;
  }

  onChangeModelApi(modelValue) {
    this.selectedModel = this.modelapiInfo[modelValue].ModelName;

    this.yearapiInfo = this.modelapiInfo[modelValue].Year;
    this.designapiInfo = this.yearapiInfo[0].Design;
    this.themodelapiInfo = this.designapiInfo[0].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedYear = this.yearapiInfo[0].YearName;
    this.selectedDesign = this.designapiInfo[0].DesignName;
    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];
  }

  onChangeYearApi(yearValue) {
    this.selectedYear = this.yearapiInfo[yearValue].YearName;

    this.designapiInfo = this.yearapiInfo[yearValue].Design;
    this.themodelapiInfo = this.designapiInfo[0].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedDesign = this.designapiInfo[0].DesignName;
    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];
  }

  onChangeDesignApi(designValue) {
    this.selectedDesign = this.designapiInfo[designValue].DesignName;

    this.themodelapiInfo = this.designapiInfo[designValue].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];

    this.tmp2 = false;
  }

  onChangeTheModelApi(themodelValue) {
    this.selectedTheModel = this.themodelapiInfo[themodelValue].TheModelName;

    this.typeapiInfo = this.themodelapiInfo[themodelValue].TheModelType;

    this.selectedType = this.typeapiInfo[0];
  }

  onChangeTypeApi(typeValue) {
    this.selectedType = this.typeapiInfo[typeValue];
  }

  // when tab == 2
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

    this.tmp3 = false;
  }

  sendData(event) {
    if (!this.loginForm.valid) return false;
    event.preventDefault();
    const target = event.target;
    // console.log(target);
    const myDesign = target.querySelector("#myDesign").value;
    const myTheModel = target.querySelector("#myTheModel").value;
    const myType = target.querySelector("#myType").value;
    const myKilometre = target.querySelector("#myKilometre").value;
    const myBrand = target.querySelector("#myBrand").value;
    const myModel = target.querySelector("#myModel").value;
    const myYear = target.querySelector("#myYear").value;
    const fromcity = target.querySelector("#fromcity").value;
    const tocity = target.querySelector("#tocity").value;
    const todistance = target.querySelector("#todistance").value;
    const toaddress = target.querySelector("#toaddress").value;
    const date = target.querySelector("#date").value;
    const time = target.querySelector("#time").value;
    const firstname = target.querySelector("#firstname").value;
    const lastname = target.querySelector("#lastname").value;
    const phone = target.querySelector("#phone").value;
    const email = target.querySelector("#email").value;

    console.log(myDesign);
    console.log(myTheModel);
    console.log(myType);
    console.log(myKilometre);
    console.log(myBrand);
    console.log(myModel);
    console.log(myYear);
    console.log(fromcity);
    console.log(tocity);
    console.log(todistance);
    console.log(toaddress);
    console.log(date);
    console.log(time);
    console.log(firstname);
    console.log(lastname);
    console.log(phone);
    console.log(email);

    // send http request to backend.
    var order = {
      brand: myBrand,
      model: myModel,
      yearRegisterd: myYear,
      design: myDesign,
      modelDetail: myTheModel,
      type: myType,
      kilometre: myKilometre,
      from: fromcity,
      to: tocity,
      distance: todistance,
      address: toaddress,
      date: date,
      time: time,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email
    };

    var url = "http://localhost:8000/api/orders";
    axios.post(url, order).then(function(response) {
      console.log(response);
      // if(response.data != null && response.data.id > 0) {
      //   // this.success = true;
      //   setTimeout(() => {
      //     // this.success = false;
      //   }, 2000);
      // }
    });
  }

  func1() {
    this.tab = 1;
    this.step = 2;
    this.tmp2 = true;
    this.typeapiInfo = [];
    this.themodelapiInfo = [];
  }

  func2() {
    this.tab = 2;
    this.step = 3;
  }

  func3() {
    this.tab = 2;
    this.step = 4;
  }
}
