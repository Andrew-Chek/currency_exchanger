import { ExchangeService } from '../services/exchange/exchange.service';
import { CurrencyInput } from './../../shared/interfaces/CurrencyInput';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit, OnDestroy {

  startAmount = 0;
  exchangeAmount = 0;
  startCurrency = "UAH"
  exchangeCurrency = "USD"
  exhangeDirection = false;
  private subscriptions:Array<Subscription> = []

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
  }

  setAmount(amount:number) {
    this.exchangeAmount != amount ? this.exhangeDirection = true : this.exhangeDirection = false;
    this.exchangeAmount = amount;
  }

  private setCurrencyInfo(currencyInfo: CurrencyInput) {
    if(currencyInfo.directionFlag)
    {
      this.setAmount(currencyInfo.amount)
      this.exchangeCurrency = currencyInfo.name;
    }
    else
    {
      this.startAmount = currencyInfo.amount;
      this.startCurrency = currencyInfo.name;
    }
  }

  convertCurrencies(currencyInfo: CurrencyInput) {
    this.setCurrencyInfo(currencyInfo)
    let request;
    this.exhangeDirection ?
      request = this.exchangeService.convertCurrencies(this.exchangeCurrency, this.startCurrency, this.exchangeAmount)
      .pipe(
        map((value) => {
          this.startAmount = value.result;
          return value;
        })) :
      request = this.exchangeService.convertCurrencies(this.startCurrency, this.exchangeCurrency, this.startAmount)
      .pipe(
        map((value) => {
          this.exchangeAmount = value.result;
          return value;
        }));
    const sub = request.subscribe(value => console.log(value));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
