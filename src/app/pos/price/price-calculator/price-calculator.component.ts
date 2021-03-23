import { PosService } from './../../pos.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss'],
})
export class PriceCalculatorComponent implements OnInit {
  @Input() showCalculator;
  moneyShouldPaid: number;
  paidMoney: number;
  resultText: string;
  calculatorResult: number;
  color: string;
  constructor(private posService: PosService) { }

  ngOnInit() {
    this.moneyShouldPaid = this.posService.getOriginalTotalPrice();
    this.posService.paidMoneyChanged.subscribe(result => {
      this.setPaidMoney(result);
      console.log('paid');
      this.setResultText();
    });
    this.posService.totalPricechanged.subscribe(price => {
      console.log('total price chaged ' + price);
      this.setMoneyShouldPay(price);
      this.setResultText();

    });
  }

  setPaidMoney(value: number) {
    this.paidMoney = value;
  }

  setMoneyShouldPay(price: number) {
    this.moneyShouldPaid = price;

  }
  setResultText() {
    const result = this.moneyShouldPaid - this.paidMoney;
    if (result < 0) {
      this.resultText = '找零';
      this.color = 'warning';
      // 找零
    } else if (result === 0) {
      // 剛好
      this.resultText = '';
      this.color = 'white';

    } else {
      // 不足
      this.resultText = '不足';
      this.color = 'danger';

    }
    this.calculatorResult = Math.abs(result);
  }



}
