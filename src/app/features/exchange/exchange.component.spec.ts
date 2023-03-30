import { CurrencyInput } from './../../shared/interfaces/CurrencyInput';
import { mockCurrencyResponse } from 'src/app/shared/interfaces/MockCurrencyResponse';
import { ExchangeService } from './../services/exchange/exchange.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeComponent } from './exchange.component';
import { InputComponent } from 'src/app/shared/interfaces/MockInputComponent';
import { of } from 'rxjs';

describe('ExchangeComponent', () => {
  let component: ExchangeComponent;
  let fixture: ComponentFixture<ExchangeComponent>;
  let exchangeServiceStab: Partial<ExchangeService> = {
    convertCurrencies(startCurrency, exchangeCurrency, amount) {
      return of(mockCurrencyResponse)
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ExchangeComponent,
        InputComponent
      ],
      providers: [
        {provide: ExchangeService, useValue: exchangeServiceStab}
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(ExchangeComponent);
    component = fixture.componentInstance;
    spyOn(component, 'convertCurrencies')
    fixture.detectChanges();
  });

  describe('#reverseCurrencies', () => {
    it('should reset currencies and trigger convert method', () => {
      component.reverseCurrencies();
      expect(component.startCurrency).toEqual('USD');
      expect(component.exchangeCurrency).toEqual('UAH');
      expect(component.convertCurrencies).toHaveBeenCalled();
    });
  })
});
