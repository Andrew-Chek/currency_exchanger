import { SharedModule } from './../../shared/shared.module';
import { ExchangeComponent } from './exchange.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ExchangeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ExchangeComponent
  ]
})
export class ExchangeModule { }
