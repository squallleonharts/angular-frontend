import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatRadioModule,
  MatButtonModule,
  MatInputModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { BrandService } from "./brand.service";

import { MatSearchableModule } from "@bl4y/mat-searchable";
import { TerminComponent } from "./termin/termin.component";

@NgModule({
  declarations: [AppComponent, DropdownComponent, TerminComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatSearchableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BrandService],
  bootstrap: [AppComponent]
})
export class AppModule {}
