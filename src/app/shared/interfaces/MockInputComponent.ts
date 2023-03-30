import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CurrencyInput } from "./CurrencyInput";

@Component({
	selector: 'app-board',
	template: '<div></div>',
})
export class InputComponent {
    @Input() direction = ""
    @Input() selectValue = "USD"
    @Input() inputValue = ""
    @Output() sentCurrencyInput = new EventEmitter<CurrencyInput>();
    options = ['EUR', 'USD', 'UAH', 'GBP'];
    checkError = false;
}