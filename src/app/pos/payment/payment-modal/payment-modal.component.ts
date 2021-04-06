import { PosService } from './../../pos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {

  constructor(private posService: PosService) { }

  payMethod = 'cash';
  totalPrice: number;
  layaway = 1;
  ngOnInit() {
    // get total price first 
    this.totalPrice = this.posService.getTotalPrice();


    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
    });
  }
  onPaymentSelect(value) {
    console.log('changed', value);
    this.payMethod = value;
    if (value === 'cash') {
      this.cash();
    }
  }

  cash() {
    this.totalPrice = this.posService.getTotalPrice();
  }

  onLayawaySelect(value) {
    this.layaway = +value;
  }
}
