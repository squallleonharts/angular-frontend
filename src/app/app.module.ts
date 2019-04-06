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

import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    ReactiveFormsModule,
    NotifierModule.withConfig( customNotifierOptions ),
  ],
  providers: [BrandService],
  bootstrap: [AppComponent]
})
export class AppModule {}
