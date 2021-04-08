import { PosService } from './../pos.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Payment } from './payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  private paymentList = [new Payment(0, 'cash', this.posService.getTotalPrice(), {})];
  constructor(private posService: PosService) { }

  paymentChanged = new EventEmitter();

  getPaymentList() {
    return this.paymentList;
  }

  addPayment(payment: Payment) {
    this.paymentList.push(payment);
    this.paymentChanged.emit(this.paymentList);
    console.log(this.paymentList);
  }

  deletePayment(id: number) {
    this.paymentList = this.paymentList.filter(x =>
      x.id !== id
    );
    this.paymentChanged.emit(this.paymentList);
    console.log(this.paymentList);

  }
}
