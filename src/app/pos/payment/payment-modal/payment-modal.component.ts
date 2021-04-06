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

  constructor(private posService: PosService, private modalController: ModalController) { }

  payMethod = 'cash';
  methodName = '現金';
  totalPrice: number;
  layaway = 1;
  remit: { code: string, name: string };
  isConfirmDisabled = false;
  payPrice = 0;
  authCodeLength: number;
  @ViewChild('inputAuthCode', { read: ElementRef }) private authCodeEl: ElementRef;
  @ViewChild('inputCredit4Digi', { read: ElementRef }) private Credit4DigiEl: ElementRef;
  @ViewChild('inputRemit5Digi', { read: ElementRef }) private remit5DigiEl: ElementRef;

  ngOnInit() {
    // get total price first
    this.totalPrice = this.posService.getTotalPrice();
    // 剛開始是 cash -> true
    this.posService.setPayMethodSelected(true);

    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
    });
  }
  onPaymentSelect(value) {
    console.log('changed', value);
    this.payMethod = value;
    if (value !== 'cash') {
      this.isConfirmDisabled = true;
    }


    if (value === 'cash') {
      this.cash();
      this.methodName = '現金';
    } else if (value === 'remit') {
      this.onRemitSelect();
      this.methodName = '匯款';

    } else if (value === 'credit-card') {
      this.methodName = '刷卡';
      this.authCodeLength = 6;
      // this.posService.setPayMethodSelected(false);
    } else if (value === 'line-pay') {
      this.authCodeLength = 5;
      this.methodName = 'LINE PAY';
    }
  }

  cash() {
    this.totalPrice = this.posService.getTotalPrice();

  }

  onLayawaySelect(value) {
    this.layaway = +value;
  }

  onCancelClick() {
    this.posService.setPayMethodSelected(false);
    this.modalController.dismiss();
  }


  // 如果已選了匯款資訊，但要更改匯款銀行時
  onRemitItemClick() {
    this.onRemitSelect();
  }


  // when payMeth selet
  async onRemitSelect() {
    const modal = await this.modalController.create({
      component: PaymentRemitComponent,
      backdropDismiss: false
    });


    modal.onWillDismiss().then(result => {
      const data = result.data;
      console.log('close modal , bank : ' + data);
      this.remit = data;
    });

    return await modal.present();
  }


  onConfirmClick() {
    console.log('total price : ', this.totalPrice);
    this.modalController.dismiss({
      paidPrice: this.totalPrice,
      methodName: this.methodName,
      method: this.payMethod
    });
  }


  onTotalPriceChange() {
    const shouldPay = this.posService.getTotalPrice();
    if (this.totalPrice >= shouldPay) {
      this.isConfirmDisabled = false;
    } else {
      this.isConfirmDisabled = true;
    }
  }

  onRemitInfoChange() {
    const remitCode = this.remit5DigiEl.nativeElement.value;
    if (remitCode.length === 5) {
      this.isConfirmDisabled = false;
    } else {
      this.isConfirmDisabled = true;
    }
  }


  onCreditCardInfoChange() {
    const authCode = this.authCodeEl.nativeElement.value;


    if (this.payMethod === 'line-pay') {
      if (authCode.length === this.authCodeLength) {
        this.isConfirmDisabled = false;
      } else {
        this.isConfirmDisabled = true;
      }
    } else {
      const cardDigi = this.Credit4DigiEl.nativeElement.value;

      // credit card
      if (authCode.length === this.authCodeLength && cardDigi.length === 4) {
        this.isConfirmDisabled = false;
      } else {
        this.isConfirmDisabled = true;
      }
    }
  }
}
