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
  exchangeDirection = false;
  private subscriptions:Array<Subscription> = []

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
  }

  setAmount(amount:number) {
    this.exchangeAmount != amount ? this.exchangeDirection = true : this.exchangeDirection = false;
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
    this.exchangeDirection ?
      request = this.exchangeService.convertCurrencies(this.exchangeCurrency, this.startCurrency, this.exchangeAmount)
      .pipe(
        map((value) => {
          this.startAmount = +value.result.toFixed(3);
          return value;
        })) :
      request = this.exchangeService.convertCurrencies(this.startCurrency, this.exchangeCurrency, this.startAmount)
      .pipe(
        map((value) => {
          this.exchangeAmount = +value.result.toFixed(3);
          return value;
        }));
    const sub = request.subscribe(value => console.log(value));
    this.subscriptions.push(sub);
  }

  reverseCurrencies()
  {
    const lurker = this.startCurrency;
    this.startCurrency = this.exchangeCurrency;
    this.exchangeCurrency = lurker;
    const currencyInfo : CurrencyInput = {
      directionFlag: false,
      name: this.startCurrency,
      amount: this.startAmount
    }
    this.convertCurrencies(currencyInfo);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
