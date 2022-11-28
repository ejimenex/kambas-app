import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
; import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { CardCrudComponent } from './card.crud.component.ts/card.crud.component';
import { CardService } from './service/card.service';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,CardCrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxLoadingModule,
    AppRoutingModule,NgbModule

  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
