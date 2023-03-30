import { MatIconModule } from '@angular/material/icon';
import { ExchangeModule } from './features/exchange/exchange.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    CoreModule,
    ExchangeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
