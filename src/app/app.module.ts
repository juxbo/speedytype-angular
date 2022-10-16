import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TextInputComponent } from "./text-input/text-input.component";
import { ButtonComponent } from "./button/button.component";
import { TextPreviewComponent } from "./text-preview/text-preview.component";
import { MainComponent } from './main/main.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    ButtonComponent,
    TextPreviewComponent,
    MainComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
