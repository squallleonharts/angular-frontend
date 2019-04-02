import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import axios from "axios";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  tab = 1;



  ngOnInit() {}

  sendData(event) {
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

    var url = 'http://localhost:8000/api/orders';
    axios.post(url, order)
      .then(function (response) {
        console.log(response);
        // if(response.data != null && response.data.id > 0) {
        //   // this.success = true;
        //   setTimeout(() => {
        //     // this.success = false;
        //   }, 2000);
        // }
      });

  }

  func() {
    this.tab = 2;
  }
}
