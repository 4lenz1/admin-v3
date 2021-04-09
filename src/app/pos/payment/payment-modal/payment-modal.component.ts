import { PaymentService } from './../payment.service';
import { Payment } from './../payment.model';
import { ModalController } from '@ionic/angular';
import { PosService } from './../../pos.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {

  constructor(private posService: PosService,
    private modalController: ModalController,
    private paymentService: PaymentService) { }


  shouldPay: number;
  isConfirmDisabled = false;
  paymentList: Payment[];
  paidPrice: number;
  calculatorText = { price: null, color: 'success', text: '剛好' };
  ngOnInit() {
    // get total price first
    this.shouldPay = this.posService.getTotalPrice();
    // 剛開始是 cash -> true
    this.posService.setPayMethodSelected(true);

    this.posService.totalPricechanged.subscribe(result => {
      this.shouldPay = result;
      this.calculator();

    });

    // init payment list for payment app-payment-item
    this.paymentList = this.paymentService.getPaymentList();
    // when payment list changed
    this.paymentService.paymentListChanged.subscribe(result => {
      this.paymentList = result;
    });

    // check wether confirm btn should disabled or not
    this.paymentService.btnConfirmDisabledChanged.subscribe(result => {
      this.isConfirmDisabled = result;
    });
    this.paymentService.totalPriceChanged.subscribe(result => {
      this.paidPrice = result;
      this.calculator();
    });
  }





  calculator() {
    const result = {
      price: this.shouldPay - this.paidPrice,
      text: '',
      color: ''
    };

    if (result.price > 0) {
      result.text = '不足';
      result.color = 'danger';
    } else if (result.price === 0) {
      result.text = '剛好';
      result.color = 'success';
    }
    else {
      result.text = '找零';
      result.color = 'warning';
    }
    result.price = Math.abs(result.price);
    this.calculatorText = result;
  }

  addNewPayment() {
    const id = this.paymentList.length;
    console.log('add new payment list id:' + id);

    const payment = new Payment(id, 'cash', 0, {});
    this.paymentService.addPayment(payment);
  }


  onCancelClick() {
    this.posService.setPayMethodSelected(false);
    this.modalController.dismiss();
  }


  onConfirmClick() {
    console.log('total price : ', this.shouldPay);

    // when payPrice is enough
    this.modalController.dismiss({
      paidPrice: this.shouldPay,
      // methodName: this.methodName,
      // method: this.payMethod
    });
  }

}
