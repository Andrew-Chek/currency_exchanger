import { mergeMap, map, Subscription } from 'rxjs';
import { ExchangeService } from './../../features/services/exchange/exchange.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency } from 'src/app/shared/interfaces/Currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  currencies:Array<Currency> = [];
  private subscriptions: Array<Subscription> = [];

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.fillCurrencies();
  }

  private fillCurrencies() {
    this.currencies = [];
    const conversionSub = this.exchangeService.convertCurrencies('USD', 'UAH').pipe(
      mergeMap(value => {
        const usd = {name: 'USD', value: +value.result.toFixed(3)}
        this.currencies.push(usd);
        return this.exchangeService.convertCurrencies('EUR', 'UAH')
      }),
      map(value => {
        const eur = {name: 'EUR', value: +value.result.toFixed(3)}
        this.currencies.push(eur);
      })
    ).subscribe();
    this.subscriptions.push(conversionSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
