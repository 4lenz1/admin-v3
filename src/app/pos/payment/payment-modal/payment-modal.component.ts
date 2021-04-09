import { PaymentService } from './../payment.service';
import { Payment } from './../payment.model';
import { ModalController } from '@ionic/angular';
import { PosService } from './../../pos.service';
import { Component, OnInit } from '@angular/core';


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
  isConfirmDisabled = true;
  paymentList: Payment[];
  paidPrice: number;
  calculatorText = { price: null, color: 'danger', text: 'ＮＯ　＄＄' };
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
      this.isConfirmDisabled = true;

    } else if (result.price === 0) {
      result.text = '剛好';
      result.color = 'success';
      this.isConfirmDisabled = false;
    }
    else {
      result.text = '找零';
      result.color = 'warning';
    }
    result.price = Math.abs(result.price);
    this.calculatorText = result;
    this.isConfirmDisabled = false;

  }

  addNewPayment() {
    const id = this.paymentList.length;
    console.log('add new payment list id:' + id);

    const payment = new Payment(id, '現金', 'cash', 0, {});
    this.paymentService.addPayment(payment);
  }


  onCancelClick() {
    this.posService.setPayMethodSelected(false);
    this.modalController.dismiss();
  }


  onConfirmClick() {
    console.log('confirm clicked ,  total price : ', this.shouldPay);

    // call this function to update paid total price if user not change anything
    // 如果是選現金，直接按確定沒更改任何選項，要自己再update一次
    this.paymentService.setPaidTotalPrice();

    // when payPrice is enough
    this.modalController.dismiss({
      // paidPrice: this.paidPrice,
      // methodName: this.methodName,
      // method: this.payMethod
    });
  }

}
