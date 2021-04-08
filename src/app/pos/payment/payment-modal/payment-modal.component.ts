import { PaymentService } from './../payment.service';
import { Payment } from './../payment.model';
import { ModalController } from '@ionic/angular';
import { PosService } from './../../pos.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentRemitComponent } from './payment-remit/payment-remit.component';


@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {

  constructor(private posService: PosService,
              private modalController: ModalController,
              private paymentService: PaymentService) { }


  totalPrice: number;
  isConfirmDisabled = false;
  paymentList: Payment[];

  ngOnInit() {
    // get total price first
    this.totalPrice = this.posService.getTotalPrice();
    // 剛開始是 cash -> true
    this.posService.setPayMethodSelected(true);

    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
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
    console.log('total price : ', this.totalPrice);

    // when payPrice is enough
    this.modalController.dismiss({
      paidPrice: this.totalPrice,
      // methodName: this.methodName,
      // method: this.payMethod
    });
  }

}
