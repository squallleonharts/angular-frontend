import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import axios from "axios";

import { BrandService } from "./brand.service";

const apiBaseUrl = "http://localhost:8000/api/";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private notifier: NotifierService;

  basicForm: FormGroup;
  loginForm: FormGroup;

  title = "app";
  tab = 1;
  step = 1;

  // for booking button
  tmp1 = true;
  tmp2 = true;
  tmp3 = true;

  // for disabled
  model_disable = true;
  year_disable = true;
  kilo_disable = true;
  email_disable = true;

  // for show/hide tab
  isShow = 1;

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

  constructor(
    private brand: BrandService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.basicForm = this.formBuilder.group({
      basicemail: [
        { value: "", disabled: true },
        [Validators.required, Validators.email]
      ]
    });
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
    this.selectedBrand = this.brandapiInformation[brandValue].value;

    this.modelapiInfo = this.brandapiInformation[brandValue].main_types;
    this.yearapiInfo = this.modelapiInfo[0].buillt_dates;
    this.designapiInfo = this.yearapiInfo[0].Design;
    this.themodelapiInfo = this.designapiInfo[0].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedModel = this.modelapiInfo[0].value;
    this.selectedYear = this.yearapiInfo[0].YearName;
    this.selectedDesign = this.designapiInfo[0].DesignName;
    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];

    this.model_disable = false;
    this.year_disable = true;
  }

  onChangeModelApi(modelValue) {
    this.selectedModel = this.modelapiInfo[modelValue].value;

    this.yearapiInfo = this.modelapiInfo[modelValue].buillt_dates;
    this.designapiInfo = this.yearapiInfo[0].Design;
    this.themodelapiInfo = this.designapiInfo[0].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedYear = this.yearapiInfo[0].YearName;
    this.selectedDesign = this.designapiInfo[0].DesignName;
    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];

    this.year_disable = false;
  }

  onChangeYearApi(yearValue) {
    this.selectedYear = this.yearapiInfo[yearValue].YearName;

    this.designapiInfo = this.yearapiInfo[yearValue].Design;
    this.themodelapiInfo = this.designapiInfo[0].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedDesign = this.designapiInfo[0].DesignName;
    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];

    this.tmp1 = false;
  }

  onChangeDesignApi(designValue) {
    this.selectedDesign = this.designapiInfo[designValue].DesignName;

    this.themodelapiInfo = this.designapiInfo[designValue].TheModel;
    this.typeapiInfo = this.themodelapiInfo[0].TheModelType;

    this.selectedTheModel = this.themodelapiInfo[0].TheModelName;
    this.selectedType = this.typeapiInfo[0];
  }

  onChangeTheModelApi(themodelValue) {
    this.selectedTheModel = this.themodelapiInfo[themodelValue].TheModelName;

    this.typeapiInfo = this.themodelapiInfo[themodelValue].TheModelType;

    this.selectedType = this.typeapiInfo[0];
  }

  onChangeTypeApi(typeValue) {
    this.selectedType = this.typeapiInfo[typeValue];

    this.kilo_disable = false;
  }

  onChangeKiloApi(kiloValue) {
    this.basicForm.controls["basicemail"].enable();

    this.tmp2 = false;
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

    this.tmp3 = false;
  }

  sendData(event) {
    if (!this.loginForm.valid) return false;
    event.preventDefault();
    const target = event.target;

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

    // send http request to backend.
    var order = {
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

    var $this = this;

    var message = "";

    var url = apiBaseUrl + "orders";
    axios
      .post(url, order)
      .then(function(res) {
        var success = false;
        if (res.data[0]) {
          message += "Appointment booking success. ";
        } else {
          message += "Appointment booking failure. ";
        }

        if (res.data[1]) {
          message += "Mail sent.";
        } else {
          message += "Mail not sent.";
        }

        if (res.data[0] && res.data[1])
          $this.notifier.notify("success", message);
        else $this.notifier.notify("error", message);
      })
      .catch(function(error) {
        message = "Network error.";
        $this.notifier.notify("error", message);
      });
  }

  func1() {
    this.isShow = 2;
    this.tab = 1;
    this.step = 2;
    if (this.tmp2) {
      this.tmp2 = true;
    }
  }

  sendFirstData(event) {
    if (!this.basicForm.valid) return false;

    this.isShow = 1;

    event.preventDefault();
    const target = event.target;

    const myBrand = target.querySelector("#myBrand").value;
    const myModel = target.querySelector("#myModel").value;
    const myYear = target.querySelector("#myYear").value;
    const myDesign = target.querySelector("#myDesign").value;
    const myTheModel = target.querySelector("#myTheModel").value;
    const myType = target.querySelector("#myType").value;
    const myKilometre = target.querySelector("#myKilometre").value;
    const basicemail = target.querySelector("#basicemail").value;

    var carInfo = {
      brand: myBrand,
      model: myModel,
      year: myYear,
      design: myDesign,
      modelDetail: myTheModel,
      type: myType,
      kilometre: myKilometre,
      email: basicemail
    };

    var message = "";

    var $this = this;

    var url = apiBaseUrl + "carinfo";
    axios
      .post(url, carInfo)
      .then(function(res) {
        $this.tab = 2;
        $this.step = 3;

        if (res.data[0]) {
          message += "Mail sent.";
          $this.notifier.notify("success", message);
        } else {
          message += "Mail not sent.";
          $this.notifier.notify("error", message);
        }
      })
      .catch(function(error) {
        message = "Network error.";
        $this.notifier.notify("error", message);
      });
  }

  func3() {
    this.isShow = 2;

    this.tab = 2;
    this.step = 4;
  }
}
