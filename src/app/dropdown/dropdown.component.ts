import { Component, OnInit } from "@angular/core";
import { BrandService } from "../brand.service";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"]
})
export class DropdownComponent implements OnInit {
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

  constructor(private brand: BrandService) {}

  ngOnInit() {
    this.getCountries();
    this.getKilometre();
  }

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
  }

  onChangeTheModelApi(themodelValue) {
    this.selectedTheModel = this.themodelapiInfo[themodelValue].TheModelName;

    this.typeapiInfo = this.themodelapiInfo[themodelValue].TheModelType;

    this.selectedType = this.typeapiInfo[0];
  }

  onChangeTypeApi(typeValue) {
    this.selectedType = this.typeapiInfo[typeValue];
  }
}
