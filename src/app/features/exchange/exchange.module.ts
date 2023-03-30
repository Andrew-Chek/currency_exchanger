import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    SharedModule,
  ],
  exports: [
    ExchangeComponent
  ]
})
export class ExchangeModule { }
